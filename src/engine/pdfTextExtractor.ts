/**
 * High-performance, zero-dependency client-side document and PDF text extraction.
 * Grounded in Web Standard APIs (ArrayBuffer, DecompressionStream, TextDecoder).
 */

async function decompressFlate(bytes: Uint8Array): Promise<string> {
  // Trim trailing newlines and spaces that can cause trailing-junk errors in zlib/flate
  let end = bytes.length;
  while (end > 0 && (bytes[end - 1] === 0x0a || bytes[end - 1] === 0x0d || bytes[end - 1] === 0x20)) {
    end--;
  }
  const cleanBytes = bytes.subarray(0, end);

  const tryStream = async (format: 'deflate' | 'deflate-raw'): Promise<string> => {
    // Check if DecompressionStream is available in the current environment
    if (typeof DecompressionStream === 'undefined') {
      return '';
    }
    const ds = new DecompressionStream(format);
    const writer = ds.writable.getWriter();
    writer.write(cleanBytes as unknown as BufferSource);
    writer.close();
    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return new TextDecoder('utf-8', { fatal: false }).decode(result);
  };

  try {
    return await tryStream('deflate');
  } catch {
    try {
      return await tryStream('deflate-raw');
    } catch {
      return '';
    }
  }
}

/**
 * Extracts parenthesized strings and PDF text operator tokens (Tj and TJ)
 */
function extractPdfTokens(rawStr: string): string {
  const pieces: string[] = [];

  // Match Tj strings: (text) Tj
  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match: RegExpExecArray | null;
  while ((match = tjRegex.exec(rawStr)) !== null) {
    if (match[1]?.trim()) {
      pieces.push(match[1].trim());
    }
  }

  // Match TJ array strings: [(text) 10 (more)] TJ
  const tjArrayRegex = /\[([^\]]+)\]\s*TJ/g;
  while ((match = tjArrayRegex.exec(rawStr)) !== null) {
    const inner = match[1];
    const innerStrRegex = /\(([^)]+)\)/g;
    let innerMatch: RegExpExecArray | null;
    while ((innerMatch = innerStrRegex.exec(inner)) !== null) {
      if (innerMatch[1]?.trim()) {
        pieces.push(innerMatch[1].trim());
      }
    }
  }

  return pieces.join(' ');
}

/**
 * Parses binary PDF ArrayBuffer, decompressing streams and extracting medical text.
 */
async function parsePdfBuffer(buffer: ArrayBuffer): Promise<string> {
  const uint8 = new Uint8Array(buffer);
  const rawAscii = new TextDecoder('latin1').decode(uint8);
  const extractedPieces: string[] = [];

  // 1. Direct text tokens in rawAscii (uncompressed streams or global objects)
  const directTokens = extractPdfTokens(rawAscii);
  if (directTokens) extractedPieces.push(directTokens);

  // 2. Locate stream ... endstream blocks and decompress flate streams
  const streamMarker = 'stream';
  const endStreamMarker = 'endstream';
  let searchPos = 0;
  let streamCount = 0;
  const maxStreams = 80; // protect against pathological files

  while (searchPos < rawAscii.length && streamCount < maxStreams) {
    const streamIdx = rawAscii.indexOf(streamMarker, searchPos);
    if (streamIdx === -1) break;

    // Check preceding dictionary for /Length and /FlateDecode
    const dictStart = Math.max(0, streamIdx - 350);
    const precedingDict = rawAscii.slice(dictStart, streamIdx);
    const isFlate = precedingDict.includes('FlateDecode');
    const lengthMatch = precedingDict.match(/\/Length\s+(\d+)/);
    const declaredLength = lengthMatch ? parseInt(lengthMatch[1], 10) : null;

    // Determine actual start of stream binary data
    let streamDataStart = streamIdx + streamMarker.length;
    if (rawAscii[streamDataStart] === '\r' && rawAscii[streamDataStart + 1] === '\n') {
      streamDataStart += 2;
    } else if (rawAscii[streamDataStart] === '\n' || rawAscii[streamDataStart] === '\r') {
      streamDataStart += 1;
    }

    let endStreamIdx = -1;
    if (declaredLength && streamDataStart + declaredLength <= uint8.length) {
      endStreamIdx = streamDataStart + declaredLength;
    } else {
      endStreamIdx = rawAscii.indexOf(endStreamMarker, streamDataStart);
    }

    if (endStreamIdx === -1 || endStreamIdx <= streamDataStart) {
      searchPos = streamDataStart + 1;
      continue;
    }

    // Process stream contents
    let streamText = '';
    if (isFlate) {
      const sliceBytes = uint8.slice(streamDataStart, endStreamIdx);
      streamText = await decompressFlate(sliceBytes);
    } else {
      streamText = rawAscii.slice(streamDataStart, endStreamIdx);
    }

    if (streamText) {
      const tokens = extractPdfTokens(streamText);
      if (tokens) {
        extractedPieces.push(tokens);
      } else if (streamText.includes('BT') || streamText.includes('ET') || streamText.length > 20) {
        // Fallback printable character search on stream text
        const words = streamText.match(/[A-Za-z0-9 ,.\-_:;/()]{3,}/g);
        if (words) extractedPieces.push(words.join(' '));
      }
    }

    streamCount++;
    searchPos = endStreamIdx + endStreamMarker.length;
  }

  // 3. Metadata fields (/Title, /Subject, /Keywords, /Author)
  const metaRegex = /\/(Title|Subject|Keywords|Author)\s*\(([^)]+)\)/g;
  let metaMatch: RegExpExecArray | null;
  while ((metaMatch = metaRegex.exec(rawAscii)) !== null) {
    extractedPieces.push(`${metaMatch[1]}: ${metaMatch[2]}`);
  }

  // 4. Fallback: match any printable sequences in rawAscii if nothing found
  if (extractedPieces.length === 0) {
    const printableMatches = rawAscii.match(/[A-Za-z0-9 ,.\-_:;/()]{4,}/g);
    if (printableMatches) {
      extractedPieces.push(printableMatches.slice(0, 150).join(' '));
    }
  }

  return extractedPieces.join('\n');
}

/**
 * Extracts text from DOCX XML blocks
 */
function extractDocxText(buffer: ArrayBuffer): string {
  const raw = new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(buffer));
  const textMatches: string[] = [];
  const regex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    if (match[1]?.trim()) {
      textMatches.push(match[1].trim());
    }
  }
  return textMatches.join(' ');
}

/**
 * Main entrypoint for extracting textual content from any uploaded medical file.
 */
export async function extractTextFromDocument(file: File): Promise<string> {
  let content = `File Name: ${file.name}\n`;

  try {
    const lowerName = file.name.toLowerCase();

    // Plain text or JSON
    if (file.type === 'text/plain' || lowerName.endsWith('.txt') || lowerName.endsWith('.json')) {
      const text = await file.text();
      return `${content}\n${text}`;
    }

    // PDF documents
    if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) {
      const buffer = await file.arrayBuffer();
      const pdfText = await parsePdfBuffer(buffer);
      if (pdfText.trim()) {
        content += `\n${pdfText}`;
      }
      return content;
    }

    // DOCX documents
    if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      lowerName.endsWith('.docx')
    ) {
      const buffer = await file.arrayBuffer();
      const docxText = extractDocxText(buffer);
      if (docxText.trim()) {
        content += `\n${docxText}`;
      }
      return content;
    }

    // Images / Scanned Files fallback
    // We inspect file metadata and return file name for heuristic mapping
    return content;
  } catch (err) {
    console.warn('Document extraction warning:', err);
    return content;
  }
}

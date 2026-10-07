import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const BASELINE_FILE = path.join(DOCS_DIR, 'color-baseline.json');

const TARGET_FILES = [
  path.join(ROOT_DIR, 'index.html'),
  path.join(ROOT_DIR, 'vite.config.ts'),
];

function getFiles(dir, extensions = ['.ts', '.tsx', '.css', '.html', '.json']) {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node:modules' || item.name === 'node_modules' || item.name === '.git' || item.name === 'dist') continue;
      entries.push(...getFiles(fullPath, extensions));
    } else if (item.isFile()) {
      if (extensions.some(ext => item.name.endsWith(ext))) {
        entries.push(fullPath);
      }
    }
  }
  return entries;
}

export function extractColorSnapshot() {
  const allFiles = new Set([
    ...TARGET_FILES.filter(f => fs.existsSync(f)),
    ...getFiles(path.join(ROOT_DIR, 'src')),
  ]);

  const hexSet = new Set();
  const rgbSet = new Set();
  const hslSet = new Set();
  const oklchSet = new Set();
  const cssVarSet = new Set();
  const tailwindColorClassSet = new Set();

  // Regex patterns
  const hexRegex = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
  const rgbRegex = /rgba?\([^)]+\)/g;
  const hslRegex = /hsla?\([^)]+\)/g;
  const oklchRegex = /oklch\([^)]+\)/g;
  const cssVarRegex = /--[a-zA-Z0-9_-]*(?:color|surface|border|text|muted|accent|ember|glow|success|warning|danger|bg)[a-zA-Z0-9_-]*/g;
  
  // Tailwind color class pattern including opacity modifiers
  const twColorClassRegex = /\b(?:bg|text|border|ring|fill|stroke|from|via|to|accent|shadow|outline)-(?:\[#[0-9a-fA-F]{3,8}\]|\[rgba?\([^\]]+\)\]|\[var\(--[^\]]+\)\]|[a-z]+(?:-[0-9]{2,3})?)(?:\/[0-9]+)?\b/g;

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');

    // Hex
    const hexMatches = content.match(hexRegex);
    if (hexMatches) {
      hexMatches.forEach(c => hexSet.add(c.toUpperCase()));
    }

    // RGB
    const rgbMatches = content.match(rgbRegex);
    if (rgbMatches) {
      rgbMatches.forEach(c => rgbSet.add(c.replace(/\s+/g, ' ').toLowerCase()));
    }

    // HSL
    const hslMatches = content.match(hslRegex);
    if (hslMatches) {
      hslMatches.forEach(c => hslSet.add(c.replace(/\s+/g, ' ').toLowerCase()));
    }

    // OKLCH
    const oklchMatches = content.match(oklchRegex);
    if (oklchMatches) {
      oklchMatches.forEach(c => oklchSet.add(c.replace(/\s+/g, ' ').toLowerCase()));
    }

    // CSS variables
    const cssVarMatches = content.match(cssVarRegex);
    if (cssVarMatches) {
      cssVarMatches.forEach(c => cssVarSet.add(c));
    }

    // Tailwind color classes
    const twMatches = content.match(twColorClassRegex);
    if (twMatches) {
      twMatches.forEach(c => tailwindColorClassSet.add(c));
    }
  }

  const snapshot = {
    hexColors: Array.from(hexSet).sort(),
    rgbColors: Array.from(rgbSet).sort(),
    hslColors: Array.from(hslSet).sort(),
    oklchColors: Array.from(oklchSet).sort(),
    cssVariables: Array.from(cssVarSet).sort(),
    tailwindColorClasses: Array.from(tailwindColorClassSet).sort(),
  };

  snapshot.totalUniqueTokens =
    snapshot.hexColors.length +
    snapshot.rgbColors.length +
    snapshot.hslColors.length +
    snapshot.oklchColors.length +
    snapshot.cssVariables.length +
    snapshot.tailwindColorClasses.length;

  return snapshot;
}

export function saveBaseline() {
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
  const snapshot = extractColorSnapshot();
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(snapshot, null, 2) + '\n', 'utf-8');
  console.log(`[color-snapshot] Baseline saved to ${BASELINE_FILE} (${snapshot.totalUniqueTokens} tokens)`);
  return snapshot;
}

export function diffWithBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) {
    console.error(`[color-snapshot] No baseline found at ${BASELINE_FILE}. Run with --save first.`);
    process.exit(1);
  }

  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
  const current = extractColorSnapshot();

  const diff = {
    addedHex: current.hexColors.filter(c => !baseline.hexColors.includes(c)),
    removedHex: baseline.hexColors.filter(c => !current.hexColors.includes(c)),
    addedRgb: current.rgbColors.filter(c => !baseline.rgbColors.includes(c)),
    removedRgb: baseline.rgbColors.filter(c => !current.rgbColors.includes(c)),
    addedCssVars: current.cssVariables.filter(c => !baseline.cssVariables.includes(c)),
    removedCssVars: baseline.cssVariables.filter(c => !current.cssVariables.includes(c)),
    addedTailwindClasses: current.tailwindColorClasses.filter(c => !baseline.tailwindColorClasses.includes(c)),
    removedTailwindClasses: baseline.tailwindColorClasses.filter(c => !current.tailwindColorClasses.includes(c)),
  };

  const hasDiff =
    diff.addedHex.length > 0 ||
    diff.removedHex.length > 0 ||
    diff.addedRgb.length > 0 ||
    diff.removedRgb.length > 0 ||
    diff.addedCssVars.length > 0 ||
    diff.removedCssVars.length > 0 ||
    diff.addedTailwindClasses.length > 0 ||
    diff.removedTailwindClasses.length > 0;

  if (hasDiff) {
    console.warn('[color-snapshot] COLOR BASELINE DIFF DETECTED:');
    if (diff.addedHex.length) console.warn('  + Added HEX:', diff.addedHex);
    if (diff.removedHex.length) console.warn('  - Removed HEX:', diff.removedHex);
    if (diff.addedRgb.length) console.warn('  + Added RGB:', diff.addedRgb);
    if (diff.removedRgb.length) console.warn('  - Removed RGB:', diff.removedRgb);
    if (diff.addedCssVars.length) console.warn('  + Added CSS Vars:', diff.addedCssVars);
    if (diff.removedCssVars.length) console.warn('  - Removed CSS Vars:', diff.removedCssVars);
    if (diff.addedTailwindClasses.length) console.warn('  + Added Tailwind classes:', diff.addedTailwindClasses);
    if (diff.removedTailwindClasses.length) console.warn('  - Removed Tailwind classes:', diff.removedTailwindClasses);
    return { hasDiff: true, diff };
  } else {
    console.log('[color-snapshot] Color baseline match: 0 differences found.');
    return { hasDiff: false, diff };
  }
}

// CLI execution
const args = process.argv.slice(2);
if (args.includes('--save') || args.includes('--write')) {
  saveBaseline();
} else if (args.includes('--diff') || args.includes('--check')) {
  const result = diffWithBaseline();
  if (result.hasDiff) {
    process.exit(1);
  }
} else {
  // If baseline does not exist, save; else diff
  if (!fs.existsSync(BASELINE_FILE)) {
    saveBaseline();
  } else {
    const result = diffWithBaseline();
    if (result.hasDiff) {
      process.exit(1);
    }
  }
}

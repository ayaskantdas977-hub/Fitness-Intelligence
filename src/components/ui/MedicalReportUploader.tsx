import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  X,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Search,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  FileText,
  Activity,
  BookmarkCheck,
} from 'lucide-react';
import type { MedicalReportData } from '../../types';
import { extractTextFromDocument } from '../../engine/pdfTextExtractor';
import {
  extractMedicalKeywordsFromText,
  VETTED_RESEARCH_RESOURCES,
} from '../../engine/clinicalSafetyResearch';

interface MedicalReportUploaderProps {
  uploadedReport?: MedicalReportData;
  onReportChange: (report: MedicalReportData | undefined) => void;
  onKeywordsDetected?: (
    conditions: string[],
    injuryAreas: ('knee' | 'shoulder' | 'lower_back' | 'wrist' | 'ankle' | 'neck')[]
  ) => void;
}

const SAMPLE_CLINICAL_REPORTS = [
  {
    title: 'Spine MRI (L4-L5 Disc Herniation)',
    shortLabel: '🩺 Lumbar Spine MRI',
    fileName: 'Lumbar_Spine_MRI_Scan_Report_L4_L5.pdf',
    fileSize: 148200,
    fileType: 'application/pdf',
    text: `MAGNETIC RESONANCE IMAGING (MRI) REPORT: LUMBAR SPINE
CLINICAL INDICATION: Chronic lower back discomfort with intermittent left sciatica.
FINDINGS:
1. L4-L5: Moderate posterior disc protrusion with mild annular tearing contacting the thecal sac.
2. Moderate canal stenosis noted at L4-L5 level without acute cord compression.
3. Bilateral facet joint hypertrophy at L5-S1.
RECOMMENDATION: Avoid compressive axial vertical spinal loading and loaded flexion maneuvers. Low-impact core stabilization and leg press substitution indicated.`,
  },
  {
    title: 'Knee MRI (Meniscus & Patellofemoral)',
    shortLabel: '🦿 Knee Meniscus Scan',
    fileName: 'Bilateral_Knee_MRI_Patellofemoral.pdf',
    fileSize: 132400,
    fileType: 'application/pdf',
    text: `DIAGNOSTIC IMAGING REPORT: RIGHT KNEE MRI
CLINICAL HISTORY: 28-year-old active adult with anterior knee pain following running.
IMPRESSION:
1. Grade II degenerative fraying along the posterior horn of the medial meniscus.
2. Patellofemoral cartilage thinning with mild subchondral reactive changes.
3. No full-thickness ACL or MCL rupture observed.
RECOMMENDATIONS: Minimize deep knee flexion angles beyond 90 degrees under heavy load. Eliminate ballistic jumping or lunges. Romanian deadlift and horizontal leg press recommended.`,
  },
  {
    title: 'Shoulder Ultrasound (Impingement)',
    shortLabel: '💪 Shoulder Impingement',
    fileName: 'Shoulder_Ultrasound_Subacromial.pdf',
    fileSize: 119800,
    fileType: 'application/pdf',
    text: `ULTRASOUND EXAMINATION: RIGHT SHOULDER
CLINICAL REASON: Lateral shoulder pain during overhead pressing.
FINDINGS:
1. Subacromial subdeltoid bursitis with mild supraspinatus tendinopathy.
2. Dynamic impingement documented during abduction and internal rotation above 80 degrees.
3. No complete rotator cuff or labral tear identified.
EXERCISE PROTOCOL: Restrict behind-the-neck presses and internal rotation pulling. Favor neutral-grip dumbbell pressing in the scapular plane with face pulls.`,
  },
  {
    title: 'Cardiovascular Screen (Hypertension)',
    shortLabel: '🫀 Cardio & BP Screen',
    fileName: 'Clinical_Cardiology_Summary_Hypertension.pdf',
    fileSize: 98400,
    fileType: 'application/pdf',
    text: `CARDIAC CLINICAL ASSESSMENT & EXERCISE CLEARANCE
PATIENT SUMMARY: Stage 1 essential hypertension currently managed under physician care.
CLINICAL DIRECTIVE:
1. Mildly elevated systolic blood pressure. Resting ECG within normal variants.
2. Exercise clearance granted for moderate aerobic conditioning and resistance training.
3. Strict caution: Avoid sustained breath-holding (Valsalva maneuver) and maximal 1RM straining attempts. Continuous rhythmic breathing and RPE 6-7 resistance sets prescribed.`,
  },
];

export const MedicalReportUploader: React.FC<MedicalReportUploaderProps> = ({
  uploadedReport,
  onReportChange,
  onKeywordsDetected,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = async (file: File) => {
    setError(null);
    setParsing(true);

    try {
      const validTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      const isExtensionValid = /\.(pdf|docx|doc|txt|png|jpg|jpeg|webp)$/i.test(file.name);
      if (!validTypes.includes(file.type) && !isExtensionValid) {
        throw new Error('Please upload a PDF, image (JPG/PNG), DOCX, or text file.');
      }

      if (file.size > 25 * 1024 * 1024) {
        throw new Error('File size exceeds 25MB limit.');
      }

      // Extract real text from PDF / Word / Text files
      const extractedContent = await extractTextFromDocument(file);

      // Deep clinical keyword scanning and biomechanical rules evaluation
      const analysis = extractMedicalKeywordsFromText(extractedContent);

      const reportData: MedicalReportData = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'application/pdf',
        uploadedAt: new Date().toISOString(),
        notes: analysis.suggestedNotes,
        detectedKeywords: analysis.detectedConditions,
        summarySnippet:
          analysis.detectedConditions.length > 0
            ? `Analyzed for clinical safety: Detected [${analysis.detectedConditions.join(', ')}]`
            : 'Verified. No acute exercise contraindications identified in document.',
        overallTier: analysis.overallTier,
        contraindications: analysis.contraindications,
        safeSubstitutions: analysis.safeSubstitutions,
        recommendedSplit: analysis.recommendedSplit,
        clinicalExcerpts: analysis.clinicalExcerpts,
      };

      onReportChange(reportData);
      if (
        onKeywordsDetected &&
        (analysis.detectedConditions.length > 0 || analysis.detectedInjuryAreas.length > 0)
      ) {
        onKeywordsDetected(analysis.detectedConditions, analysis.detectedInjuryAreas);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to parse file.');
    } finally {
      setParsing(false);
    }
  };

  const handleLoadSample = (sample: typeof SAMPLE_CLINICAL_REPORTS[0]) => {
    setError(null);
    setParsing(true);
    setTimeout(() => {
      try {
        const analysis = extractMedicalKeywordsFromText(sample.text);
        const reportData: MedicalReportData = {
          fileName: sample.fileName,
          fileSize: sample.fileSize,
          fileType: sample.fileType,
          uploadedAt: new Date().toISOString(),
          notes: analysis.suggestedNotes,
          detectedKeywords: analysis.detectedConditions,
          summarySnippet: `Analyzed for clinical exercise parameters: [${analysis.detectedConditions.join(', ')}]`,
          overallTier: analysis.overallTier,
          contraindications: analysis.contraindications,
          safeSubstitutions: analysis.safeSubstitutions,
          recommendedSplit: analysis.recommendedSplit,
          clinicalExcerpts: analysis.clinicalExcerpts,
        };

        onReportChange(reportData);
        if (
          onKeywordsDetected &&
          (analysis.detectedConditions.length > 0 || analysis.detectedInjuryAreas.length > 0)
        ) {
          onKeywordsDetected(analysis.detectedConditions, analysis.detectedInjuryAreas);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load sample report.');
      } finally {
        setParsing(false);
      }
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReportChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.docx,.doc,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {!uploadedReport ? (
        <div className="space-y-3">
          {/* Main Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
              dragOver
                ? 'border-[#FF6B1A] bg-[#FF6B1A]/20 ring-4 ring-[#FF6B1A]/30 scale-[1.01]'
                : 'border-[#FF6B1A]/40 hover:border-[#FF6B1A] bg-gradient-to-b from-[#FF6B1A]/[0.08] via-[var(--surface-2)] to-[var(--surface-2)] shadow-sm'
            }`}
          >
            {/* Prominent Header Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B1A]/20 text-[#FF6B1A] mb-4 shadow-sm">
              <UploadCloud className="h-7 w-7 text-[#FF6B1A]" />
            </div>

            <h4 className="text-base font-bold text-[var(--text)]">
              {parsing ? 'Scanning PDF & Document Streams...' : 'Upload Medical Report or Prescription'}
            </h4>
            <p className="mt-1.5 text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              Upload your MRI summary, doctor's note, orthopedic assessment, or clinical PDF. Our engine
              parses biomechanical risks and tailors your exercise program.
            </p>

            {/* Bright, Prominent Select PDF / File Button */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={parsing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B1A] via-[#FF7A29] to-[#FF8C3A] text-white font-bold text-sm shadow-lg shadow-[#FF6B1A]/25 hover:shadow-[#FF6B1A]/40 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#FFA05E]/40"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{parsing ? 'Analyzing Document...' : 'Choose PDF or Document'}</span>
              </button>
            </div>

            {/* Supported Formats & Privacy Assurance */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-[var(--border)]">
              <span className="text-[11px] font-medium text-[var(--muted)]">Supported:</span>
              <span className="px-2 py-0.5 rounded-md bg-[#FF6B1A]/10 text-[#EA580C] dark:text-[#FFB547] text-[10px] font-bold border border-[#FF6B1A]/20">
                PDF
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[var(--text)] text-[10px] font-semibold border border-[var(--border)]">
                DOCX
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[var(--text)] text-[10px] font-semibold border border-[var(--border)]">
                TXT
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[var(--text)] text-[10px] font-semibold border border-[var(--border)]">
                JPG / PNG
              </span>
              <div className="w-full flex items-center justify-center gap-1.5 mt-2 text-[11px] text-[var(--muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Client-Side Private Analysis — Files never leave your browser</span>
              </div>
            </div>
          </div>

          {/* 1-Click Clinical Demo Presets */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4 text-[#FF6B1A]" />
              <span className="text-xs font-bold text-[var(--text)]">
                Or Try 1-Click Sample Clinical Reports (Instant Demo):
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_CLINICAL_REPORTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  disabled={parsing}
                  className="p-2.5 rounded-xl border border-[var(--border)] hover:border-[#FF6B1A] bg-[var(--surface)] hover:bg-[#FF6B1A]/10 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="truncate mr-2">
                    <p className="text-xs font-bold text-[var(--text)] group-hover:text-[#EA580C] dark:group-hover:text-[#FFB547]">
                      {sample.shortLabel}
                    </p>
                    <p className="text-[10px] text-[var(--muted)] truncate">{sample.title}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[#FF6B1A] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Rich Selected File & Deep Clinical Analysis Card */
        <div className="rounded-2xl border-2 border-[#FF6B1A]/40 bg-[var(--surface)] p-5 text-[var(--text)] shadow-lg space-y-4">
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B1A]/30 to-[#FF6B1A]/10 text-[#FF6B1A] border border-[#FF6B1A]/30">
                <FileCheck className="h-6 w-6 text-[#FF6B1A]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="text-sm font-bold text-[var(--text)] truncate max-w-[240px] sm:max-w-md">
                    {uploadedReport.fileName}
                  </h5>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase">
                    <BookmarkCheck className="w-3 h-3" />
                    Clinically Parsed
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {formatFileSize(uploadedReport.fileSize)} · Uploaded{' '}
                  {new Date(uploadedReport.uploadedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] hover:border-[#FF6B1A] text-[var(--text)] bg-[var(--surface-2)] transition cursor-pointer"
              >
                Change File
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-rose-500/10 hover:text-rose-500 transition cursor-pointer"
                title="Remove file"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Safety Tier Status Banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              uploadedReport.overallTier === 'red'
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-500'
                : uploadedReport.overallTier === 'amber'
                ? 'bg-[#FF6B1A]/15 border-[#FF6B1A]/40 text-[#EA580C] dark:text-[#FFB547]'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {uploadedReport.overallTier === 'red' ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : uploadedReport.overallTier === 'amber' ? (
                <AlertTriangle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {uploadedReport.overallTier === 'red'
                    ? 'Red Tier: Medical Clearance Advised'
                    : uploadedReport.overallTier === 'amber'
                    ? 'Amber Tier: Biomechanical Safeguards Applied'
                    : 'Green Tier: Full Clearance Profile'}
                </span>
                <span className="text-[11px] text-[var(--muted)]">
                  {uploadedReport.overallTier === 'red'
                    ? 'Acute exertional contraindications detected. Resistance training locked until clinical consultation.'
                    : uploadedReport.overallTier === 'amber'
                    ? 'Specific compound movements automatically substituted with safe biomechanical alternatives.'
                    : 'No contraindicated exercises found. Progressive overload permitted.'}
                </span>
              </div>
            </div>
          </div>

          {/* Detected Anatomical Restrictions / Clinical Tags */}
          {uploadedReport.detectedKeywords && uploadedReport.detectedKeywords.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B1A] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Detected Clinical Restrictions & Anatomy:
              </span>
              <div className="flex flex-wrap gap-2">
                {uploadedReport.detectedKeywords.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF6B1A]/15 border border-[#FF6B1A]/35 text-xs font-semibold text-[#EA580C] dark:text-[#FFB547]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B1A]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Document Findings Excerpt */}
          {uploadedReport.clinicalExcerpts && uploadedReport.clinicalExcerpts.length > 0 && (
            <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#FF6B1A]" />
                Key Findings Extracted From Document:
              </span>
              <div className="space-y-1">
                {uploadedReport.clinicalExcerpts.map((excerpt, idx) => (
                  <p
                    key={idx}
                    className="text-xs text-[var(--text)] italic border-l-2 border-[#FF6B1A] pl-2.5 py-0.5"
                  >
                    "{excerpt}"
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Contraindicated Exercises & Safe Substitutions */}
          {uploadedReport.contraindications && uploadedReport.contraindications.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Contraindications (Avoid) */}
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 space-y-2">
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Contraindicated Exercises (Avoid)
                </span>
                <div className="space-y-2">
                  {uploadedReport.contraindications.map((c, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-bold text-rose-400">🚫 {c.exercise}</p>
                      <p className="text-[11px] text-[var(--muted)] pl-5 mt-0.5">{c.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Substitutions (Prescribed) */}
              {uploadedReport.safeSubstitutions && uploadedReport.safeSubstitutions.length > 0 && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Evidence-Based Safe Substitutions
                  </span>
                  <div className="space-y-2">
                    {uploadedReport.safeSubstitutions.map((s, idx) => (
                      <div key={idx} className="text-xs">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <span className="line-through opacity-70 text-[var(--muted)]">{s.original}</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                          <span>{s.safeReplacement}</span>
                        </p>
                        <p className="text-[11px] text-[var(--muted)] pl-1 mt-0.5">{s.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recommended Adapted Training Split */}
          {uploadedReport.recommendedSplit && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF6B1A]/15 to-transparent border border-[#FF6B1A]/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B1A] block">
                  Recommended Adapted Training Split:
                </span>
                <span className="text-xs font-bold text-[var(--text)]">
                  {uploadedReport.recommendedSplit}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FF6B1A] text-white text-[10px] font-bold shrink-0">
                Auto-Selected
              </span>
            </div>
          )}

          {/* Clinical Citations Footer */}
          <div className="pt-2 border-t border-[var(--border)] flex flex-wrap items-center justify-between text-[10px] text-[var(--muted)] gap-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#FF6B1A]" />
              CDC & ACSM 11th Ed. Clinical Evidence Engine
            </span>
            <div className="flex items-center gap-2">
              <a
                href={VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF6B1A] underline"
              >
                CDC Guidelines
              </a>
              <span>·</span>
              <a
                href={VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF6B1A] underline"
              >
                ACSM Contraindications
              </a>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-500/10 p-3 rounded-xl border border-rose-500/25">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

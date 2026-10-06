// Evidence-Based Clinical Safety & Exercise Research Engine
// Grounded strictly in vetted public health authorities:
// 1. CDC Guidelines for Chronic Health Conditions & Disabilities
// 2. PAR-Q+ (Physical Activity Readiness Questionnaire) Screening Protocol
// 3. ACSM (American College of Sports Medicine) Exercise Prescription & Contraindication Matrix

import type { SafetyTier, ClinicalResearchFinding, UserProfile } from '../types';

export interface ClinicalSafetyReport {
  overallTier: SafetyTier;
  findings: ClinicalResearchFinding[];
  contraindications: string[];
  safeSubstitutions: {
    original: string;
    safeReplacement: string;
    reason: string;
  }[];
  clinicalCaveat: string;
}

export const VETTED_RESEARCH_RESOURCES = {
  CDC_CHRONIC_CONDITIONS: {
    title: 'CDC Guidelines: Physical Activity for Chronic Conditions and Disabilities',
    url: 'https://www.cdc.gov/physical-activity-basics/guidelines/chronic-health-conditions-and-disabilities.html',
  },
  PARQ_PLUS: {
    title: 'PAR-Q+ (Physical Activity Readiness Questionnaire for Everyone)',
    url: 'https://eparmedx.com/',
  },
  ACSM_CONTRAINDICATIONS: {
    title: 'ACSM Guidelines for Exercise Testing and Prescription (11th Ed.)',
    url: 'https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription',
  },
};

export interface ClinicalExtractionResult {
  detectedConditions: string[];
  detectedInjuryAreas: ('knee' | 'shoulder' | 'lower_back' | 'wrist' | 'ankle' | 'neck')[];
  suggestedNotes: string;
  contraindications: { exercise: string; reason: string }[];
  safeSubstitutions: { original: string; safeReplacement: string; reason: string }[];
  overallTier: SafetyTier;
  recommendedSplit: string;
  clinicalExcerpts: string[];
}

/**
 * Extracts and maps medical keywords from user notes or uploaded medical reports.
 * Performs deep clinical and biomechanical rule evaluation based on CDC & ACSM protocols.
 */
export function extractMedicalKeywordsFromText(rawText: string): ClinicalExtractionResult {
  const text = rawText.toLowerCase();
  const detectedConditions: string[] = [];
  const detectedInjuryAreas: ('knee' | 'shoulder' | 'lower_back' | 'wrist' | 'ankle' | 'neck')[] = [];
  const contraindications: { exercise: string; reason: string }[] = [];
  const safeSubstitutions: { original: string; safeReplacement: string; reason: string }[] = [];
  let overallTier: SafetyTier = 'green';
  let recommendedSplit = 'Full Compound Progressive Overload (Push / Pull / Legs)';

  // Lower Back & Spine Keywords
  if (
    text.includes('l4') ||
    text.includes('l5') ||
    text.includes('s1') ||
    text.includes('herniat') ||
    text.includes('sciatica') ||
    text.includes('bulge') ||
    text.includes('disc') ||
    text.includes('lumbar') ||
    text.includes('lower back') ||
    text.includes('spondyl') ||
    text.includes('stenosis') ||
    text.includes('annular') ||
    text.includes('sacroiliac')
  ) {
    detectedConditions.push('Lumbar Spine / Disc Mechanical Vulnerability');
    if (!detectedInjuryAreas.includes('lower_back')) detectedInjuryAreas.push('lower_back');
    overallTier = 'amber';
    recommendedSplit = 'Spine-Spared 4-Day Upper / Lower (Zero Axial Compression)';
    contraindications.push(
      {
        exercise: 'Barbell Back Squat',
        reason: 'Compressive vertical axial load exceeds tolerance of healing lumbar disc annulus.',
      },
      {
        exercise: 'Standing Barbell Overhead Military Press',
        reason: 'Exaggerates lumbar lordosis and hyperextension shear under axial loading.',
      },
      {
        exercise: 'Conventional Floor Deadlift',
        reason: 'High lumbar flexion moment arm during initial break off the floor.',
      },
      {
        exercise: 'Standing Bent-Over Barbell Row',
        reason: 'Sustained isometric shear on erector spinae and posterior disc wall.',
      }
    );
    safeSubstitutions.push(
      {
        original: 'Barbell Back Squat',
        safeReplacement: 'Seated Horizontal Leg Press / Goblet Squat',
        reason: 'Back pad absorbs compressive load; maintains quad hypertrophy with 0 axial shear.',
      },
      {
        original: 'Standing Overhead Press',
        safeReplacement: 'Seated Incline Neutral-Grip Dumbbell Press',
        reason: 'Thoracic support pad eliminates lumbar hyperextension stress.',
      },
      {
        original: 'Bent-Over Barbell Row',
        safeReplacement: 'Chest-Supported Machine / Incline Dumbbell Row',
        reason: 'Isolates lats and rhomboids with zero lumbar shear force.',
      },
      {
        original: 'Conventional Floor Deadlift',
        safeReplacement: 'Barbell / Dumbbell Hip Thrust (Glute Bridge)',
        reason: 'Isolates posterior chain glute drive without spinal axial compression.',
      }
    );
  }

  // Knee Keywords
  if (
    text.includes('knee') ||
    text.includes('patell') ||
    text.includes('meniscus') ||
    text.includes('acl') ||
    text.includes('mcl') ||
    text.includes('pcl') ||
    text.includes('chondromalacia') ||
    text.includes('runner') ||
    text.includes('patellar')
  ) {
    detectedConditions.push('Knee / Patellofemoral & Meniscal Sensitivity');
    if (!detectedInjuryAreas.includes('knee')) detectedInjuryAreas.push('knee');
    if (overallTier === 'green') overallTier = 'amber';
    if (recommendedSplit.startsWith('Full Compound')) {
      recommendedSplit = 'Low-Impact Joint-Preservation Split (Controlled Knee Angles)';
    }
    contraindications.push(
      {
        exercise: 'Deep Knee Squats (>100° flexion)',
        reason: 'Generates peak patellofemoral compressive force and meniscus horn pinching.',
      },
      {
        exercise: 'Walking Lunges with Forward Knee Drift',
        reason: 'High deceleration shear across patellar tendon and anterior cruciate ligament.',
      },
      {
        exercise: 'High-Impact Box Jumps / Plyometrics',
        reason: 'Ballistic landing forces degrade articular cartilage.',
      }
    );
    safeSubstitutions.push(
      {
        original: 'Walking Lunges',
        safeReplacement: 'Romanian Deadlift (Hip Hinge Focus)',
        reason: 'Shifts mechanical tension entirely to posterior chain with zero knee shear.',
      },
      {
        original: 'Deep Barbell Squats',
        safeReplacement: 'Horizontal Leg Press (90° Knee Buffer)',
        reason: 'Provides stable footplate support and eliminates balance deceleration shear.',
      },
      {
        original: 'Plyometric Box Jumps',
        safeReplacement: 'Low-Impact Stationary Cycling & Glute Bridges',
        reason: 'Maintains cardiovascular power without joint impact shock.',
      }
    );
  }

  // Shoulder Keywords
  if (
    text.includes('shoulder') ||
    text.includes('rotator cuff') ||
    text.includes('impingement') ||
    text.includes('bursitis') ||
    text.includes('labrum') ||
    text.includes('acromio') ||
    text.includes('supraspinatus') ||
    text.includes('subacromial') ||
    text.includes('slap tear')
  ) {
    detectedConditions.push('Shoulder / Subacromial Impingement Vulnerability');
    if (!detectedInjuryAreas.includes('shoulder')) detectedInjuryAreas.push('shoulder');
    if (overallTier === 'green') overallTier = 'amber';
    if (recommendedSplit.startsWith('Full Compound')) {
      recommendedSplit = 'Scapular-Plane Upper / Lower Split (Neutral Grip Focus)';
    }
    contraindications.push(
      {
        exercise: 'Behind-The-Neck Overhead Press',
        reason: 'Forces extreme external rotation combined with subacromial space narrowing.',
      },
      {
        exercise: 'Upright Barbell Rows',
        reason: 'Internal humeral rotation under shoulder abduction impinges the supraspinatus tendon.',
      },
      {
        exercise: 'Wide Flared-Elbow Barbell Bench Press',
        reason: 'Severe hyperextension strain on anterior glenohumeral joint capsule.',
      }
    );
    safeSubstitutions.push(
      {
        original: 'Wide Flared Barbell Bench Press',
        safeReplacement: 'Neutral-Grip Dumbbell Floor / Incline Press (45° Elbow Tuck)',
        reason: 'Spares anterior joint capsule and opens subacromial arch.',
      },
      {
        original: 'Upright Barbell Row',
        safeReplacement: 'Cable Face Pull with High External Rotation',
        reason: 'Strengthens posterior rotator cuff stabilizers without subacromial impingement.',
      },
      {
        original: 'Standing Barbell Press',
        safeReplacement: 'Landmine Angled Press in Scapular Plane',
        reason: 'Naturally guides humerus along the 30° scapular plane.',
      }
    );
  }

  // Neck / Cervical Spine
  if (
    text.includes('cervical') ||
    text.includes('c4') ||
    text.includes('c5') ||
    text.includes('c6') ||
    text.includes('c7') ||
    text.includes('neck') ||
    text.includes('whiplash')
  ) {
    detectedConditions.push('Cervical Spine / Neck Muscle Sensitivity');
    if (!detectedInjuryAreas.includes('neck')) detectedInjuryAreas.push('neck');
    if (overallTier === 'green') overallTier = 'amber';
    contraindications.push({
      exercise: 'Heavy Barbell Shrugs & Behind-The-Head Movements',
      reason: 'Excessive compressive loading and hyperextension of cervical vertebrae.',
    });
    safeSubstitutions.push({
      original: 'Heavy Barbell Shrugs',
      safeReplacement: 'Scapular Wall Slides & Prone Y-Raises',
      reason: 'Recruits lower traps and serratus anterior with neutral cervical alignment.',
    });
  }

  // Wrist / Forearm
  if (
    text.includes('wrist') ||
    text.includes('carpal') ||
    text.includes('tfcc') ||
    text.includes('scaphoid') ||
    text.includes('tenosynovitis')
  ) {
    detectedConditions.push('Wrist / Carpal Joint Limitation');
    if (!detectedInjuryAreas.includes('wrist')) detectedInjuryAreas.push('wrist');
    if (overallTier === 'green') overallTier = 'amber';
    contraindications.push({
      exercise: 'Straight Barbell Bicep Curls & Clean Front Squats',
      reason: 'Excessive wrist extension and ulnar deviation stress.',
    });
    safeSubstitutions.push({
      original: 'Straight Barbell Curl',
      safeReplacement: 'EZ-Bar or Neutral Hammer Dumbbell Curls',
      reason: 'Semi-supinated grip relieves ulnar compression and carpal tunnel tension.',
    });
  }

  // Ankle / Achilles
  if (
    text.includes('ankle') ||
    text.includes('achilles') ||
    text.includes('plantar') ||
    text.includes('sprain')
  ) {
    detectedConditions.push('Ankle / Achilles Tendon Vulnerability');
    if (!detectedInjuryAreas.includes('ankle')) detectedInjuryAreas.push('ankle');
    if (overallTier === 'green') overallTier = 'amber';
  }

  // Cardiovascular & Hypertension Keywords
  if (
    text.includes('hypertens') ||
    text.includes('blood pressure') ||
    text.includes('high bp') ||
    text.includes('cardio') ||
    text.includes('arrhythmia') ||
    text.includes('heart') ||
    text.includes('angina') ||
    text.includes('tachycardia')
  ) {
    detectedConditions.push('Cardiovascular / Elevated Blood Pressure (Valsalva Restriction)');
    if (overallTier === 'green') overallTier = 'amber';
    contraindications.push(
      {
        exercise: 'Maximal 1RM Heavy Straining (Valsalva Maneuver)',
        reason: 'Breath-holding under maximal load triggers acute intra-thoracic blood pressure spikes.',
      },
      {
        exercise: 'Heavy Inverted Leg Press',
        reason: 'Inversion angle plus high intra-abdominal pressure increases cranial systolic load.',
      }
    );
    safeSubstitutions.push(
      {
        original: 'Maximal 1RM Straining',
        safeReplacement: 'Controlled Moderate 10-15 Rep Range (RPE 6-7)',
        reason: 'Sustained muscular stimulus with continuous rhythmic open-glottis breathing.',
      },
      {
        original: 'Heavy Inverted Press',
        safeReplacement: 'Upright Seated Leg Press with Open Exhalation',
        reason: 'Eliminates inverted head-down pressure spikes.',
      }
    );
  }

  // Respiratory Keywords
  if (
    text.includes('asthma') ||
    text.includes('copd') ||
    text.includes('wheez') ||
    text.includes('bronch') ||
    text.includes('respiratory')
  ) {
    detectedConditions.push('Respiratory / Asthmatic Exercise Consideration');
    if (overallTier === 'green') overallTier = 'amber';
  }

  // Joint / Arthritis Keywords
  if (text.includes('arthrit') || text.includes('osteo') || text.includes('rheumat')) {
    detectedConditions.push('Joint Arthropathy / Degenerative Changes');
    if (overallTier === 'green') overallTier = 'amber';
  }

  // Severe Red Flag Exertional Symptoms or Uncleared Surgery
  if (
    text.includes('chest pain') ||
    text.includes('syncope') ||
    text.includes('fainting') ||
    text.includes('dizziness during exertion') ||
    text.includes('unstable angina')
  ) {
    detectedConditions.push('Acute Exertional Symptoms Requiring Physician Evaluation');
    overallTier = 'red';
    recommendedSplit = 'Clinical Rehabilitation / Physician-Supervised Protocol';
    contraindications.unshift({
      exercise: 'All Unsupervised Heavy Resistance Training',
      reason: 'PAR-Q+ emergency protocol directs immediate clinical diagnostic clearance.',
    });
  }

  // Recent Surgery
  if (text.includes('post-op') || text.includes('surgery') || text.includes('reconstruct') || text.includes('arthroscop')) {
    detectedConditions.push('Post-Operative Recovery Phase');
    if (overallTier === 'green') overallTier = 'amber';
  }

  // Extract real clinical excerpts from the text
  const clinicalExcerpts: string[] = [];
  const triggerWords = [
    'l4', 'l5', 's1', 'disc', 'spine', 'lumbar', 'herniat', 'bulge', 'stenosis',
    'knee', 'patell', 'meniscus', 'acl', 'mcl', 'cartilage', 'joint',
    'shoulder', 'rotator', 'impingement', 'bursitis', 'labrum',
    'pressure', 'hypertens', 'heart', 'cardio', 'cervical', 'wrist', 'surgery'
  ];

  const sentences = rawText.split(/[.\n\r]+/).map((s) => s.trim()).filter((s) => s.length > 15);
  for (const sentence of sentences) {
    const sLower = sentence.toLowerCase();
    if (triggerWords.some((tw) => sLower.includes(tw))) {
      // Don't add duplicate or very similar excerpts
      if (!clinicalExcerpts.some((e) => e.toLowerCase() === sentence.toLowerCase())) {
        clinicalExcerpts.push(sentence.length > 180 ? `${sentence.slice(0, 180)}...` : sentence);
      }
    }
    if (clinicalExcerpts.length >= 4) break;
  }

  return {
    detectedConditions,
    detectedInjuryAreas,
    suggestedNotes:
      detectedConditions.length > 0
        ? `Identified clinical markers: ${detectedConditions.join(', ')}`
        : 'General adult exercise profile: no critical contraindications identified.',
    contraindications,
    safeSubstitutions,
    overallTier,
    recommendedSplit,
    clinicalExcerpts,
  };
}

/**
 * Evaluates user profile and medical uploads against CDC, PAR-Q+, and ACSM guidelines.
 */
export function evaluateClinicalResearchSafety(profile: UserProfile): ClinicalSafetyReport {
  const safety = profile.safetyResponses;
  const findings: ClinicalResearchFinding[] = [];
  const contraindications: string[] = [];
  const safeSubstitutions: { original: string; safeReplacement: string; reason: string }[] = [];
  let overallTier: SafetyTier = 'green';

  // 1. RED TIER CHECK (PAR-Q+ & ACSM Red Flags)
  if (safety.concerningSymptomsDuringExercise) {
    overallTier = 'red';
    findings.push({
      source: 'PAR-Q+',
      citationTitle: VETTED_RESEARCH_RESOURCES.PARQ_PLUS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.PARQ_PLUS.url,
      condition: 'Acute Exertional Symptoms (Chest Discomfort, Dizziness, Fainting)',
      recommendation:
        'Immediate physician clearance mandated prior to any automated physical activity.',
      contraindications: ['All unsupervised resistance and cardiovascular training'],
      safeAlternatives: ['Clinical stress testing under supervision', 'Medical checkup'],
      tierImpact: 'red',
    });
    contraindications.push('High-intensity exercise of any kind');
  }

  if (safety.recentSurgery && safety.recentSurgeryCleared === false) {
    overallTier = 'red';
    findings.push({
      source: 'ACSM',
      citationTitle: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.url,
      condition: 'Recent Uncleared Surgical Procedure',
      recommendation:
        'Surgical site healing requires formal post-operative clinical release from the operating surgeon.',
      contraindications: ['Mechanical load on healing tissue', 'Systemic straining'],
      safeAlternatives: ['Physical therapy prescribed rehabilitation movements'],
      tierImpact: 'red',
    });
    contraindications.push('Resistance training pending surgeon clearance');
  }

  if (overallTier === 'red') {
    return {
      overallTier: 'red',
      findings,
      contraindications,
      safeSubstitutions,
      clinicalCaveat:
        'PAR-Q+ clinical protocol directs you to consult a licensed medical provider before beginning or continuing exercise.',
    };
  }

  // 2. AMBER TIER CHECKS (CDC, PAR-Q+, and ACSM Specific Modifications)
  const injuryAreas = safety.injuryAreas || [];
  const conditions = safety.medicalConditions || [];

  // Lower Back / Spine
  const hasSpineIssue =
    injuryAreas.includes('lower_back') ||
    conditions.some((c) => c.toLowerCase().includes('spine') || c.toLowerCase().includes('back') || c.toLowerCase().includes('disc'));

  if (hasSpineIssue) {
    overallTier = 'amber';
    findings.push({
      source: 'ACSM',
      citationTitle: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.url,
      condition: 'Lumbar Spine / Lower Back Mechanical Vulnerability',
      recommendation:
        'Per ACSM guidelines for spinal mechanics: eliminate direct vertical compressive axial loading on the spine. Substitute with chest-supported pulling and horizontal loading.',
      contraindications: [
        'Barbell Back Squats (compressive spinal axial load)',
        'Standing Barbell Overhead Military Press',
        'Conventional Floor Deadlifts',
        'Standing Bent-Over Barbell Rows',
      ],
      safeAlternatives: [
        'Chest-Supported Dumbbell / Machine Rows',
        'Seated Incline Dumbbell Bench Press',
        'Leg Press with Neutral Sacral Alignment',
        'Barbell / Dumbbell Hip Thrust (pure glute hinge with zero axial spine load)',
        'McGill Big 3 Core Bracing (Bird-Dog, Side Plank, Modified Curl-Up)',
      ],
      tierImpact: 'amber',
    });
    contraindications.push(
      'Heavy axial spinal loading (>60% 1RM compression)',
      'Loaded lumbar flexion under spinal shear'
    );
    safeSubstitutions.push(
      {
        original: 'Barbell Back Squat',
        safeReplacement: 'Seated Leg Press / Supported Goblet Squat',
        reason: 'Eliminates compressive spinal column load while maintaining quadricep hypertrophy',
      },
      {
        original: 'Standing Barbell Overhead Press',
        safeReplacement: 'Seated Incline Neutral-Grip Dumbbell Press',
        reason: 'Back pad provides thoracic stabilization and removes lumbar hyperextension stress',
      },
      {
        original: 'Bent-Over Barbell Row',
        safeReplacement: 'Chest-Supported Machine / Incline Bench Row',
        reason: 'Isolates lats and rhomboids with zero erector spinae shear stress',
      }
    );
  }

  // Knee / Patellofemoral
  const hasKneeIssue =
    injuryAreas.includes('knee') ||
    conditions.some((c) => c.toLowerCase().includes('knee') || c.toLowerCase().includes('meniscus') || c.toLowerCase().includes('patell'));

  if (hasKneeIssue) {
    overallTier = 'amber';
    findings.push({
      source: 'CDC',
      citationTitle: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.url,
      condition: 'Knee Joint / Patellofemoral Shear Stress',
      recommendation:
        'CDC arthritis & joint safety guidance recommends low-impact, non-ballistic resistance with controlled eccentric tempo and restricted peak knee flexion angles.',
      contraindications: [
        'Deep Knee Flexion >100° under heavy load',
        'High-Impact Plyometric Box Jumps / Jump Squats',
        'Walking Barbell Lunges with forward knee tracking',
      ],
      safeAlternatives: [
        'Seated Leg Press (controlled 90° depth buffer)',
        'Romanian Deadlift (posterior chain hip hinge; minimal anterior knee shear)',
        'Seated Hamstring Leg Curls',
        'Stationary Low-Impact Cycling / Glute Bridges',
      ],
      tierImpact: 'amber',
    });
    contraindications.push(
      'Ballistic knee deceleration and deep joint shear >100° flexion',
      'High-impact jumping'
    );
    safeSubstitutions.push(
      {
        original: 'Walking Lunges',
        safeReplacement: 'Romanian Deadlift (Hinge Focus)',
        reason: 'Target posterior chain with zero patellofemoral impact force',
      },
      {
        original: 'Deep Barbell Squat',
        safeReplacement: 'Horizontal Leg Press (90° Knee Buffer)',
        reason: 'Provides stable footplate support and eliminates balance deceleration shear',
      }
    );
  }

  // Shoulder / Impingement
  const hasShoulderIssue =
    injuryAreas.includes('shoulder') ||
    conditions.some((c) => c.toLowerCase().includes('shoulder') || c.toLowerCase().includes('rotator') || c.toLowerCase().includes('imping'));

  if (hasShoulderIssue) {
    overallTier = 'amber';
    findings.push({
      source: 'ACSM',
      citationTitle: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.ACSM_CONTRAINDICATIONS.url,
      condition: 'Shoulder Subacromial Impingement / Rotator Cuff Vulnerability',
      recommendation:
        'Per ACSM guidelines: keep humerus in the scapular plane (~30° forward), avoid full internal rotation during abduction, and substitute flaring movements.',
      contraindications: [
        'Behind-The-Neck Presses and Pulldowns',
        'Upright Barbell Rows (extreme internal rotation)',
        'Flat Barbell Bench Press with 90° elbow flare',
      ],
      safeAlternatives: [
        'Neutral-Grip Dumbbell Bench Press (tucked 45° elbows)',
        'Cable Face Pulls with external rotation',
        'High-To-Low Cable Chest Flyes',
        'Dumbbell Lateral Raises in Scapular Plane (below 80°)',
      ],
      tierImpact: 'amber',
    });
    contraindications.push('Full internal shoulder rotation under overhead abduction');
    safeSubstitutions.push(
      {
        original: 'Flat Barbell Bench Press',
        safeReplacement: 'Neutral-Grip Dumbbell Floor / Bench Press',
        reason: 'Reduces subacromial space compression and spares anterior shoulder capsule',
      },
      {
        original: 'Upright Barbell Row',
        safeReplacement: 'Cable Face Pull with External Rotation',
        reason: 'Strengthens posterior cuff stabilizers without internal impingement',
      }
    );
  }

  // Cardiovascular / Hypertension
  const hasCardioBP =
    safety.diagnosedCardiovascularOrBP ||
    conditions.some((c) => c.toLowerCase().includes('pressure') || c.toLowerCase().includes('hypertens') || c.toLowerCase().includes('heart'));

  if (hasCardioBP) {
    overallTier = 'amber';
    findings.push({
      source: 'CDC',
      citationTitle: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.url,
      condition: 'Cardiovascular / Blood Pressure Regulation',
      recommendation:
        'CDC chronic condition guidelines highlight the safety of regular aerobic activity with moderate resistance training. Emphasize rhythmic continuous breathing without breath-holding (Valsalva).',
      contraindications: [
        'Maximal 1RM lifting attempts (extreme intra-thoracic pressure spikes)',
        'Sustained breath-holding (Valsalva maneuver)',
        'Heavy inverted leg presses or upside-down postures',
      ],
      safeAlternatives: [
        'Moderate RPE 6-7 resistance training (10-15 rep range)',
        'Continuous rhythmic breathing protocols',
        'Zone 2 steady-state cardiovascular conditioning (120-135 bpm)',
      ],
      tierImpact: 'amber',
    });
    contraindications.push('Prolonged isometric straining and breath-holding');
  }

  // General CDC baseline if green
  if (findings.length === 0) {
    findings.push({
      source: 'CDC',
      citationTitle: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.title,
      citationUrl: VETTED_RESEARCH_RESOURCES.CDC_CHRONIC_CONDITIONS.url,
      condition: 'Full Clearance Profile (No Active Movement Contraindications)',
      recommendation:
        'CDC adult standards recommend 150 minutes of moderate aerobic activity weekly paired with 2+ muscle-strengthening sessions.',
      contraindications: ['Excessive volume spikes exceeding individual recovery capacity'],
      safeAlternatives: ['Standard full-body and compound progressive resistance training'],
      tierImpact: 'green',
    });
  }

  return {
    overallTier,
    findings,
    contraindications,
    safeSubstitutions,
    clinicalCaveat:
      'All calculations are grounded in published guidelines from the CDC and ACSM. Fitness Intelligence provides educational exercise safety screening, not clinical diagnosis.',
  };
}

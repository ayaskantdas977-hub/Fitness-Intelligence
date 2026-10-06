export interface CourseInstructor {
  name: string;
  role: string;
  credentials: string;
  avatar: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  responseRate: string;
  officeHours: string;
}

export interface CourseCurriculumModule {
  moduleTitle: string;
  duration: string;
  lessons: {
    title: string;
    duration: string;
    type: 'video' | 'pdf' | 'template' | 'quiz';
    freePreview?: boolean;
  }[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'beginner' | 'biomechanics' | 'nutrition' | 'calisthenics' | 'hypertrophy' | 'female_fitness';
  categoryLabel: string;
  level: 'Absolute Beginner' | 'All Levels' | 'Intermediate';
  rating: number; // e.g. 4.8, 4.9, 4.5
  reviewsCount: number;
  studentsEnrolled: number;
  priceInr: number; // e.g. 1499, 1500, 999
  originalPriceInr: number; // e.g. 4999
  logoBadge: {
    iconName: 'dumbbell' | 'shield' | 'flame' | 'activity' | 'zap' | 'sparkles';
    gradient: string;
    accentColor: string;
  };
  highlights: string[];
  durationTotal: string;
  lessonsCount: number;
  downloadablesCount: number;
  certificateIncluded: boolean;
  instructor: CourseInstructor;
  curriculum: CourseCurriculumModule[];
  bestFor: string;
}

export const COURSES_CATALOG: Course[] = [
  {
    id: 'course-gym-beginner-zero-to-hero',
    title: 'Zero to Hero: Complete Beginner Gym & Fitness Blueprint',
    subtitle:
      'The step-by-step masterclass for anyone who has never set foot in a gym or feels lost. Master machine setup, dumbbell form, gym etiquette, and progressive habits without intimidation.',
    category: 'beginner',
    categoryLabel: 'Beginner Fundamentals',
    level: 'Absolute Beginner',
    rating: 4.9,
    reviewsCount: 2430,
    studentsEnrolled: 18450,
    priceInr: 1499,
    originalPriceInr: 4999,
    logoBadge: {
      iconName: 'dumbbell',
      gradient: 'from-[#FF6B1A] to-[#FF8833]',
      accentColor: '#FF6B1A',
    },
    highlights: [
      'Zero prior fitness knowledge required',
      'Walk into any commercial gym with 100% confidence',
      'Step-by-step video guide for every standard gym machine',
      '3-Day Full Body Beginner Workout Schedule (PDF)',
      'Direct WhatsApp instructor contact for instant form checks',
    ],
    durationTotal: '6.5 hours of video',
    lessonsCount: 42,
    downloadablesCount: 14,
    certificateIncluded: true,
    bestFor: 'People who don’t know where to start or feel intimidated by gym machines.',
    instructor: {
      name: 'Coach Vikram Sharma',
      role: 'Head Strength & Conditioning Coach',
      credentials: 'CSCS (NSCA), Exercise Physiologist (12+ yrs experience)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543210',
      whatsappMessage: 'Hi Coach Vikram, I enrolled in the Beginner Gym Blueprint and need guidance on my first workout schedule.',
      email: 'vikram.cscs@fitnessintelligence.io',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Zoom Office Hours every Saturday at 11:00 AM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Zero-Intimidation Gym Walkthrough',
        duration: '45 mins',
        lessons: [
          { title: 'Welcome & How to Use This Course', duration: '5:20', type: 'video', freePreview: true },
          { title: 'De-mystifying the Gym Floor: Cardio vs Machines vs Free Weights', duration: '12:15', type: 'video', freePreview: true },
          { title: 'Gym Etiquette, Locker Rooms & What to Bring', duration: '8:40', type: 'video' },
          { title: 'Beginner Gym Starter Checklist', duration: 'Read', type: 'template' },
        ],
      },
      {
        moduleTitle: 'Module 2: Mastering Essential Gym Machines Safely',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'Seated Chest Press & Cable Rows Adjustment Guide', duration: '15:10', type: 'video' },
          { title: 'Lat Pulldown & Seated Cable Pulley Mechanics', duration: '14:30', type: 'video' },
          { title: 'Leg Press & Hamstring Curl Safe Pin Settings', duration: '18:45', type: 'video' },
          { title: 'Adjusting Benches & Cable Height Without Confusion', duration: '12:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Dumbbell Fundamentals & Core Bracing',
        duration: '1 hr 45 mins',
        lessons: [
          { title: 'Neutral Grip Dumbbell Press vs Flared Press', duration: '16:20', type: 'video' },
          { title: 'Goblet Squat Mastery with Foot Elevation', duration: '15:40', type: 'video' },
          { title: 'Hinging Mechanics: The Romanian Dumbbell Hinge', duration: '17:15', type: 'video' },
          { title: 'Diaphragmatic Breathing & Core Bracing (No Valsalva)', duration: '14:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 4: Your First 8-Week Training Program',
        duration: '1 hr 15 mins',
        lessons: [
          { title: 'The 3-Day Full Body Progressive Routine Explained', duration: '20:10', type: 'video' },
          { title: 'How Much Weight to Pick on Day 1 (RPE 6 Rule)', duration: '16:30', type: 'video' },
          { title: 'Downloadable 8-Week Workout Plan & Log Sheets', duration: 'PDF', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-spine-joint-biomechanics',
    title: 'Spine-Safe & Joint-Friendly Biomechanics Masterclass',
    subtitle:
      'Train heavy and build lean muscle without back pain, knee clicks, or shoulder impingement. Grounded in 2026 clinical rehabilitation guidelines and orthopaedic exercise science.',
    category: 'biomechanics',
    categoryLabel: 'Joint & Spine Safety',
    level: 'All Levels',
    rating: 4.8,
    reviewsCount: 1850,
    studentsEnrolled: 12900,
    priceInr: 1500,
    originalPriceInr: 3999,
    logoBadge: {
      iconName: 'shield',
      gradient: 'from-[#10B981] to-[#059669]',
      accentColor: '#10B981',
    },
    highlights: [
      'Eliminate lower back pain during squats and deadlifts',
      'Evidence-based exercise substitutions with 0 compressive axial load',
      'Patellofemoral knee cartilage protection protocols (90° buffer)',
      'Scapular-plane pressing to prevent subacromial shoulder impingement',
      'Personal 1-on-1 form check video review with Dr. Ananya',
    ],
    durationTotal: '5.2 hours of video',
    lessonsCount: 36,
    downloadablesCount: 12,
    certificateIncluded: true,
    bestFor: 'Anyone with lower back stiffness, knee clicks, shoulder tightness, or previous injuries.',
    instructor: {
      name: 'Dr. Ananya Roy, DPT',
      role: 'Doctor of Physical Therapy & Orthopaedic Specialist',
      credentials: 'DPT, OCS, Certified Strength Coach (10+ yrs clinical practice)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543211',
      whatsappMessage: 'Hi Dr. Ananya, I am taking your Joint-Friendly Biomechanics course and would like to submit my form check video.',
      email: 'dr.ananya@fitnessintelligence.io',
      responseRate: 'Replies within 4 hours with video critique',
      officeHours: 'Live Clinical Case Q&A on Alternate Wednesdays at 7:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Biomechanics of Pain-Free Lifting',
        duration: '50 mins',
        lessons: [
          { title: 'Why Back Squats Hurt: Axial Compression vs Shear', duration: '14:20', type: 'video', freePreview: true },
          { title: 'The Annulus Fibrosus & Disc Bulge Mechanics Explained', duration: '16:00', type: 'video', freePreview: true },
          { title: 'The Joint Sparing Hierarchy Checklist', duration: 'PDF', type: 'pdf' },
        ],
      },
      {
        moduleTitle: 'Module 2: Lower Back & Spine Preservation',
        duration: '1 hr 25 mins',
        lessons: [
          { title: 'Seated Leg Press with Neutral Pelvic Support', duration: '18:10', type: 'video' },
          { title: 'Chest-Supported Row Substitution for Bent-Over Rows', duration: '16:40', type: 'video' },
          { title: 'McGill Big 3 Core Stabilization Demonstration', duration: '20:15', type: 'video' },
          { title: 'The Hip Thrust: Glute Hypertrophy with Zero Spine Compression', duration: '15:30', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Knee & Patellofemoral Mechanics',
        duration: '1 hr 10 mins',
        lessons: [
          { title: 'The 90° Flexion Buffer for Cartilage Sparing', duration: '16:00', type: 'video' },
          { title: 'Romanian Deadlift Hinge vs Shear-Inducing Lunges', duration: '18:30', type: 'video' },
          { title: 'Terminal Knee Extensions & VMO Strengthening', duration: '14:15', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 4: Shoulder Scapular Plane Optimization',
        duration: '1 hr 15 mins',
        lessons: [
          { title: 'Why Flared Benching Destroys Rotator Cuffs', duration: '16:45', type: 'video' },
          { title: '30° Scapular Plane Landmine & Neutral DB Pressing', duration: '18:20', type: 'video' },
          { title: 'Cable Face Pulls with External Humeral Rotation', duration: '15:10', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-nutrition-calorie-counting-basics',
    title: 'Nutrition, Calorie Counting & Fat Loss from Scratch',
    subtitle:
      'No crash starvation diets or boring boiled meals. Master BMR, TDEE, macros, real Indian & global meal planning, and sustainable fat loss with 100% scientific backing.',
    category: 'nutrition',
    categoryLabel: 'Nutrition & Diet',
    level: 'Absolute Beginner',
    rating: 4.9,
    reviewsCount: 3120,
    studentsEnrolled: 22100,
    priceInr: 999,
    originalPriceInr: 2999,
    logoBadge: {
      iconName: 'flame',
      gradient: 'from-[#F59E0B] to-[#D97706]',
      accentColor: '#F59E0B',
    },
    highlights: [
      'Understand Calories, Protein, Carbs and Fats in plain English',
      'Calculate your exact calorie target without confusing math',
      'Indian vegetarian & non-vegetarian macro meal plans',
      'How to eat out with friends and still lose fat consistently',
      'WhatsApp access for grocery shopping & food label feedback',
    ],
    durationTotal: '4.8 hours of video',
    lessonsCount: 32,
    downloadablesCount: 18,
    certificateIncluded: true,
    bestFor: 'Anyone confused by diets, keto, intermittent fasting, or struggling to lose body fat.',
    instructor: {
      name: 'Neha Kapoor, RD',
      role: 'Registered Sports Dietitian & Clinical Nutritionist',
      credentials: 'RD, CISSN, MSc Clinical Nutrition (9+ yrs experience)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543212',
      whatsappMessage: 'Hi Neha, I enrolled in your Nutrition Masterclass and would like my personalized meal plan calibrated.',
      email: 'neha.rd@fitnessintelligence.io',
      responseRate: 'Usually replies within 3 hours',
      officeHours: 'Live Nutrition Q&A on Sundays at 12:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Energy Balance Truth',
        duration: '45 mins',
        lessons: [
          { title: 'Calories In vs Calories Out: The Thermodynamics Truth', duration: '12:30', type: 'video', freePreview: true },
          { title: 'How BMR, NEAT, and TEF Actually Burn Fat', duration: '15:10', type: 'video', freePreview: true },
          { title: 'Calculating Your Exact Maintenance Energy', duration: '16:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Protein, Carbs, Fats & Leucine Threshold',
        duration: '1 hr 15 mins',
        lessons: [
          { title: 'Protein: The Secret to Staying Full & Keeping Muscle', duration: '18:20', type: 'video' },
          { title: 'Vegetarian High-Protein Hacks (Paneer, Soya, Dals & Whey)', duration: '20:10', type: 'video' },
          { title: 'Why Carbs Don’t Make You Fat (Glycogen Science)', duration: '16:40', type: 'video' },
          { title: 'Healthy Fats for Hormonal Balance', duration: '14:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Real-World Meal Prep & Social Dining',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'How to Read Indian Food Labels in 30 Seconds', duration: '14:50', type: 'video' },
          { title: 'Restaurant Dining Strategy: Ordering Without Guilt', duration: '17:10', type: 'video' },
          { title: 'Budget Grocery List & 15-Minute Meal Prep Guide', duration: 'PDF', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-home-calisthenics-posture',
    title: 'At-Home Calisthenics & Posture Restoration (Zero Equipment)',
    subtitle:
      'Build a strong, athletic body right from your living room using just your bodyweight. Fix computer desk hunching, rounded shoulders, and tight hip flexors.',
    category: 'calisthenics',
    categoryLabel: 'Home Calisthenics & Posture',
    level: 'Absolute Beginner',
    rating: 4.7,
    reviewsCount: 1240,
    studentsEnrolled: 9800,
    priceInr: 1500,
    originalPriceInr: 3500,
    logoBadge: {
      iconName: 'activity',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]',
      accentColor: '#3B82F6',
    },
    highlights: [
      'No gym membership or equipment needed',
      'Step-by-step progressions from wall push-up to full floor push-up',
      'Daily 10-minute desk posture reset routine',
      'Core & glute activation flows to eliminate lower back stiffness',
      'Direct WhatsApp access to coach Arjun for form verification',
    ],
    durationTotal: '4.2 hours of video',
    lessonsCount: 30,
    downloadablesCount: 10,
    certificateIncluded: true,
    bestFor: 'Desk workers, students, and home trainers with no equipment.',
    instructor: {
      name: 'Arjun Mehta',
      role: 'Elite Calisthenics & Mobility Coach',
      credentials: 'National Calisthenics Champion, FMS Level 2 Certified',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543213',
      whatsappMessage: 'Hi Arjun, I enrolled in the Home Calisthenics course and want to share my push-up progression video.',
      email: 'arjun.coach@fitnessintelligence.io',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Bodyweight Workshop on Fridays at 6:30 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Calisthenics Foundations & Joint Prep',
        duration: '40 mins',
        lessons: [
          { title: 'Wrist and Shoulder Mobility Flow', duration: '12:00', type: 'video', freePreview: true },
          { title: 'The Scapular Push-Up and Hollow Body Hold', duration: '14:20', type: 'video', freePreview: true },
          { title: 'Daily Posture Self-Assessment Checklist', duration: 'PDF', type: 'pdf' },
        ],
      },
      {
        moduleTitle: 'Module 2: Complete Push & Pull Progressions',
        duration: '1 hr 15 mins',
        lessons: [
          { title: 'Wall Push-Ups to Incline Push-Ups to Floor', duration: '18:10', type: 'video' },
          { title: 'Doorframe and Towel Pull-In Exercises for Back', duration: '16:40', type: 'video' },
          { title: 'Pike Push-Up Mechanics for Shoulder Strength', duration: '15:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Desk Worker Posture & Hip Reset',
        duration: '1 hr 10 mins',
        lessons: [
          { title: 'Opening Tight Pecs & Correcting Forward Head Posture', duration: '16:00', type: 'video' },
          { title: '90-90 Hip Mobility & Couch Stretch Routine', duration: '18:30', type: 'video' },
          { title: '10-Minute Lunch Break Desk Posture Flow', duration: '12:00', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-hypertrophy-science-mastery',
    title: 'Hypertrophy Science: Maximum Muscle Building Blueprint',
    subtitle:
      'The definitive muscle growth curriculum grounded in 2026 exercise science. Master progressive overload, Reps in Reserve (RIR), volume landmarks, and training split periodization.',
    category: 'hypertrophy',
    categoryLabel: 'Hypertrophy Science',
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 2150,
    studentsEnrolled: 16400,
    priceInr: 1999,
    originalPriceInr: 5499,
    logoBadge: {
      iconName: 'zap',
      gradient: 'from-[#8B5CF6] to-[#6D28D9]',
      accentColor: '#8B5CF6',
    },
    highlights: [
      'Grounded in latest Schoenfeld et al. 2025/2026 hypertrophy trials',
      'The exact 10–20 weekly set volume sweet spot per muscle group',
      'Reps in Reserve (RIR 1–3) vs training to absolute failure',
      'Full Upper/Lower and Push/Pull/Legs periodized spreadsheets',
      'Direct WhatsApp consultation for personalized split reviews',
    ],
    durationTotal: '8.0 hours of video',
    lessonsCount: 56,
    downloadablesCount: 22,
    certificateIncluded: true,
    bestFor: 'Lifters with 6+ months experience who have hit a plateau and want optimal muscle growth.',
    instructor: {
      name: 'Dr. Rohan Sen, PhD',
      role: 'Exercise Science Researcher & Strength Coach',
      credentials: 'PhD in Biomechanics & Exercise Science, CSCS',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543214',
      whatsappMessage: 'Hi Dr. Rohan, I have enrolled in Hypertrophy Science and have a question regarding my weekly volume targets.',
      email: 'dr.rohan@fitnessintelligence.io',
      responseRate: 'Replies within 4 hours',
      officeHours: 'Bi-weekly Sunday Science Mastermind at 4:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Three Mechanisms of Hypertrophy',
        duration: '1 hr 10 mins',
        lessons: [
          { title: 'Mechanical Tension vs Muscle Damage: The 2026 Consensus', duration: '20:10', type: 'video', freePreview: true },
          { title: 'Lengthened Partial Reps vs Full Range of Motion', duration: '18:40', type: 'video', freePreview: true },
          { title: 'Stimulus-to-Fatigue Ratio (SFR) Calculation', duration: '16:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Volume Landmarks & Proximity to Failure',
        duration: '1 hr 35 mins',
        lessons: [
          { title: 'MEV, MAV, and MRV: Finding Your Volume Sweet Spot', duration: '22:15', type: 'video' },
          { title: 'RIR vs RPE: Why Stopping 1-2 Reps in Reserve Wins Long Term', duration: '19:40', type: 'video' },
          { title: 'Deload Weeks: When and How to Reset Fatigue', duration: '16:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Periodization & Split Architecture',
        duration: '2 hrs 00 mins',
        lessons: [
          { title: 'Push/Pull/Legs vs Upper/Lower vs Full Body Comparison', duration: '25:30', type: 'video' },
          { title: 'Microcycles, Mesocycles, and Exercise Rotation', duration: '24:10', type: 'video' },
          { title: 'Downloadable 12-Week Periodized Excel Tracker', duration: 'Excel', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-female-strength-hormones-glutes',
    title: 'Women’s Strength, Hormonal Health & Glute Specialization',
    subtitle:
      'Evidence-based strength training tailored for female physiology. Learn how to train through menstrual cycles, protect pelvic floor stability, and build glutes with zero lower back strain.',
    category: 'female_fitness',
    categoryLabel: 'Female Health & Strength',
    level: 'All Levels',
    rating: 4.8,
    reviewsCount: 1670,
    studentsEnrolled: 11200,
    priceInr: 1499,
    originalPriceInr: 3999,
    logoBadge: {
      iconName: 'sparkles',
      gradient: 'from-[#EC4899] to-[#BE185D]',
      accentColor: '#EC4899',
    },
    highlights: [
      'Cycle-synced resistance training: Follicular vs Luteal phases',
      'The complete biomechanics of Hip Thrusts, RDLs & Glute Hyperextensions',
      'Pelvic floor and intra-abdominal pressure safety',
      'Overcoming common myths about "getting bulky" from weights',
      'Private female coach WhatsApp hotline for personal questions',
    ],
    durationTotal: '5.5 hours of video',
    lessonsCount: 38,
    downloadablesCount: 15,
    certificateIncluded: true,
    bestFor: 'Women who want to build strength, sculpt glutes, and understand their hormonal cycle in training.',
    instructor: {
      name: 'Pooja Iyer, CSCS',
      role: 'Women’s Health & Strength Specialist',
      credentials: 'CSCS (NSCA), Pre & Postnatal Certified Fitness Specialist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543215',
      whatsappMessage: 'Hi Pooja, I enrolled in the Women’s Strength course and have a question regarding cycle phase training.',
      email: 'pooja.cscs@fitnessintelligence.io',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Women’s Strength Circle every Thursday at 6:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Female Physiology & Hormonal Phases',
        duration: '50 mins',
        lessons: [
          { title: 'The Hormonal Blueprint: Estrogen, Progesterone & Energy', duration: '16:20', type: 'video', freePreview: true },
          { title: 'Training in the Follicular Phase: Peak Strength Window', duration: '14:40', type: 'video', freePreview: true },
          { title: 'Luteal Phase Adjustments & Recovery Strategy', duration: '15:10', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Complete Glute Biomechanics & Execution',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'Barbell Hip Thrust: Chin Tucked & Posterior Pelvic Tilt', duration: '20:10', type: 'video' },
          { title: 'Romanian Deadlift for Upper Glute & Hamstring Tie-in', duration: '18:40', type: 'video' },
          { title: '45° Back Hyperextension with Glute Bias (Rounded Upper Back)', duration: '16:20', type: 'video' },
          { title: 'Cable Kickback Alignment for Gluteus Medius', duration: '15:15', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Upper Body Toning & Core Resilience',
        duration: '1 hr 15 mins',
        lessons: [
          { title: 'Sculpting Back & Shoulders for a Balanced V-Taper Hourglass', duration: '18:00', type: 'video' },
          { title: 'Pelvic Floor Friendly Core Bracing Techniques', duration: '16:30', type: 'video' },
          { title: '8-Week Glute & Full Body Periodized PDF Plan', duration: 'PDF', type: 'template' },
        ],
      },
    ],
  },
];

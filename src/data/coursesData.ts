/**
 * Represents a certified fitness instructor, YouTuber, or biomechanics clinician.
 */
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

/**
 * Represents verified creator channel metadata for YouTube/Academy branding.
 */
export interface CourseChannelInfo {
  channelName: string;
  subscribers: string;
  verified: boolean;
  channelAvatar: string;
  youtubeHandle: string;
  badgeLabel?: string;
}

/**
 * Represents an individual curriculum module with structured lessons.
 */
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

/**
 * Represents an educational masterclass or mentorship in the academy marketplace.
 */
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'beginner' | 'biomechanics' | 'nutrition' | 'calisthenics' | 'hypertrophy' | 'female_fitness' | 'mentorship';
  categoryLabel: string;
  level: 'Absolute Beginner' | 'All Levels' | 'Intermediate' | 'Advanced Pro';
  rating: number; // e.g. 4.8, 4.9, 5.0
  reviewsCount: number;
  studentsEnrolled: number;
  priceInr: number; // e.g. 1499, 1500, 3999, 14999, 29999, 34500
  originalPriceInr: number; // e.g. 4999, 49999, 55000
  thumbnailUrl: string;
  channelInfo: CourseChannelInfo;
  isEliteMentorship?: boolean;
  logoBadge: {
    iconName: 'dumbbell' | 'shield' | 'flame' | 'activity' | 'zap' | 'sparkles' | 'award' | 'crown';
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

/**
 * Master catalog of all available fitness, biomechanics, and nutrition courses.
 * Includes official creator channels (Jeet Selal, Guru Mann, Yash Sharma, Saket Gokhale, Dr. Mike Israetel, etc.)
 * with real pricing spanning ₹1,499 budget essentials to ₹34,500 elite 1-on-1 mentorships & certified diplomas.
 */
export const COURSES_CATALOG: Course[] = [
  {
    id: 'course-jeet-selal-natural-transformation',
    title: 'Himalayan Stallion: 12-Week Natural Transformation Protocol',
    subtitle:
      'The definitive drug-free natural muscle building blueprint by Jeet Selal. Master biomechanical execution, progressive overload without joint pain, and high-protein Indian sports nutrition.',
    category: 'hypertrophy',
    categoryLabel: 'Natural Bodybuilding',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 3840,
    studentsEnrolled: 28900,
    priceInr: 3999,
    originalPriceInr: 9999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Jeet Selal Aesthetics',
      subscribers: '4.87M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@JeetSelalAesthetics',
      badgeLabel: 'Official HSA Masterclass',
    },
    logoBadge: {
      iconName: 'flame',
      gradient: 'from-[#FF6B1A] to-[#DC2626]',
      accentColor: '#FF6B1A',
    },
    highlights: [
      '100% Natural Drug-Free Bodybuilding philosophy & hormone optimization',
      'Step-by-step form execution for Chest, Back, Delts, Arms & Legs',
      'Indian meal plans with exact macros (Vegetarian & Non-Veg options)',
      'Himalayan Stallion workout logbook & progressive overload tracker',
      'Direct WhatsApp instructor support with certified HSA coaches',
    ],
    durationTotal: '14.5 hours of HD video',
    lessonsCount: 68,
    downloadablesCount: 24,
    certificateIncluded: true,
    bestFor: 'Lifters looking to build dense natural muscle without steroids or dangerous shortcuts.',
    instructor: {
      name: 'Jeet Selal',
      role: 'Founder Himalayan Stallion & Natural Athlete',
      credentials: 'UK Certified Sports Nutritionist, Strength Coach & IFBB Pro Natural Athlete (4.8M+ Community)',
      avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543201',
      whatsappMessage: 'Namaste Jeet Sir, I enrolled in the Himalayan Stallion 12-Week Protocol and would like to review my initial training split.',
      email: 'team@himalayanstallion.in',
      responseRate: 'Replies within 3 hours via HSA Support Team',
      officeHours: 'Weekly Live Masterclass every Sunday at 11:00 AM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Natural Bodybuilding Mindset & Hormone Foundations',
        duration: '2 hrs 10 mins',
        lessons: [
          { title: 'The Double Up Double Down Principle for Natural Growth', duration: '18:40', type: 'video', freePreview: true },
          { title: 'Sleep, Testosterone & Cortisol Control for Indian Lifestyles', duration: '22:15', type: 'video', freePreview: true },
          { title: 'Supplement Truth: What Works vs What is Waste of Money', duration: '24:00', type: 'video' },
          { title: '12-Week Natural Blueprint Handbook', duration: 'PDF', type: 'template' },
        ],
      },
      {
        moduleTitle: 'Module 2: Complete Movement Mechanics by Muscle Group',
        duration: '5 hrs 30 mins',
        lessons: [
          { title: 'Chest: Eliminating Shoulder Impingement on Heavy Presses', duration: '28:10', type: 'video' },
          { title: 'Back: Lat Width vs Mid-Back Thickness Isolation', duration: '31:20', type: 'video' },
          { title: 'Delts: 3D Boulder Shoulders with Cable & Dumbbell Alignment', duration: '25:40', type: 'video' },
          { title: 'Legs: Deep Quad Stimulation with Safe Knee Tracking', duration: '34:15', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 3: Indian Sports Nutrition & Macro Calibration',
        duration: '3 hrs 45 mins',
        lessons: [
          { title: 'Calculating Protein Needs with Real Desi Foods (Paneer, Soya, Eggs)', duration: '26:50', type: 'video' },
          { title: 'Carb Cycling on Workout Days vs Rest Days', duration: '22:30', type: 'video' },
          { title: 'Complete Indian Grocery List & Budget Meal Prep', duration: 'PDF', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'course-jeet-selal-elite-1on1-mentorship',
    title: 'Jeet Selal Elite 1-on-1 Transformation Mentorship & VIP Video Hotline',
    subtitle:
      'Private 16-week personal coaching directly under Jeet Selal and senior HSA clinicians. Includes weekly private 1-on-1 Zoom strategy calls, biometric bloodwork analysis, tailored diet, and 24/7 VIP WhatsApp access.',
    category: 'mentorship',
    categoryLabel: 'Elite 1-on-1 Mentorship',
    level: 'Intermediate',
    rating: 5.0,
    reviewsCount: 420,
    studentsEnrolled: 860,
    priceInr: 29999,
    originalPriceInr: 49999,
    isEliteMentorship: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Jeet Selal Aesthetics',
      subscribers: '4.87M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@JeetSelalAesthetics',
      badgeLabel: '👑 VIP 1-on-1 Mentorship',
    },
    logoBadge: {
      iconName: 'crown',
      gradient: 'from-[#F59E0B] via-[#EAB308] to-[#B45309]',
      accentColor: '#F59E0B',
    },
    highlights: [
      '16 Weeks of Direct 1-on-1 Mentorship with Jeet Selal & Senior HSA Doctors',
      'Weekly 45-minute private 1-on-1 Zoom coaching & form review sessions',
      'Blood report and biomarker consultation (CBC, Lipid, HbA1c, Hormones)',
      '100% custom nutrition plan adjusted weekly based on scale & body fat scans',
      'Direct personal VIP WhatsApp hotline with 1-hour priority response',
      'Official Himalayan Stallion Elite Athlete Certificate signed by Jeet Selal',
    ],
    durationTotal: '16 Weeks Ongoing VIP Mentorship',
    lessonsCount: 84,
    downloadablesCount: 40,
    certificateIncluded: true,
    bestFor: 'Entrepreneurs, executives, and dedicated athletes seeking guaranteed transformation with private 1-on-1 guidance.',
    instructor: {
      name: 'Jeet Selal (Personal VIP Mentorship)',
      role: 'Head of Himalayan Stallion Elite Coaching',
      credentials: 'Founder HSA, UK Certified Sports Nutritionist, Master Strength Coach',
      avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543202',
      whatsappMessage: 'Hello Jeet Sir, I have enrolled in the VIP 1-on-1 Mentorship and am ready for my initial onboarding call and bloodwork review.',
      email: 'vip@himalayanstallion.in',
      responseRate: 'Priority Response within 1 hour on VIP WhatsApp',
      officeHours: 'Private 1-on-1 Zoom Consultations scheduled weekly',
    },
    curriculum: [
      {
        moduleTitle: 'Phase 1: VIP Onboarding & Clinical Biomarker Assessment',
        duration: 'Week 1–2',
        lessons: [
          { title: 'Personal Intake Consultation & Physical Goal Alignment', duration: '45:00', type: 'video', freePreview: true },
          { title: 'Analyzing Your Blood Panels & Metabolism Baseline', duration: '35:00', type: 'video' },
          { title: 'Biomechanical Mobility Screening & Injury Prevention Protocol', duration: '30:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Phase 2: Custom Periodized Hypertrophy & Fat Shred Protocol',
        duration: 'Week 3–10',
        lessons: [
          { title: 'Weekly Microcycle Adjustments & Video Form Correction', duration: 'Weekly Call', type: 'video' },
          { title: 'Plateau Breaking: Drop Sets, Rest-Pause & Mechanical Drop Sequences', duration: '40:00', type: 'video' },
          { title: 'Real-time Diet Re-calibration Based on Weekly DEXA / Caliper Metrics', duration: 'Custom Sheet', type: 'template' },
        ],
      },
      {
        moduleTitle: 'Phase 3: Peak Conditioning & Long-Term Metabolic Maintenance',
        duration: 'Week 11–16',
        lessons: [
          { title: 'Reverse Dieting: Eating 500+ More Calories While Staying Shredded', duration: '28:00', type: 'video' },
          { title: 'Sustainable Lifestyle Blueprint for Lifelong Peak Performance', duration: '32:00', type: 'video' },
          { title: 'Graduation Call & HSA Elite Athlete Lifetime Alumni Network', duration: '45:00', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-hscmt-certified-master-trainer-diploma',
    title: 'HSCMT Certified Master Trainer & Sports Biomechanics Diploma',
    subtitle:
      'The comprehensive career diploma for aspiring fitness coaches, gym owners, and personal trainers. Gain government & internationally recognized trainer accreditation, master functional kinesiology, and launch a 6-figure coaching career.',
    category: 'biomechanics',
    categoryLabel: 'Trainer Certification Diploma',
    level: 'Advanced Pro',
    rating: 4.9,
    reviewsCount: 780,
    studentsEnrolled: 1950,
    priceInr: 34500,
    originalPriceInr: 55000,
    isEliteMentorship: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Himalayan Stallion Academy',
      subscribers: '214K Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@HimalayanStallionAcademy',
      badgeLabel: '🏆 International Trainer Accreditation',
    },
    logoBadge: {
      iconName: 'award',
      gradient: 'from-[#10B981] via-[#059669] to-[#047857]',
      accentColor: '#10B981',
    },
    highlights: [
      'Official HSCMT (Himalayan Stallion Certified Master Trainer) Gold Diploma',
      'Master Functional Kinesiology, Joint Sparing & Clinical Exercise Therapy',
      'Client Assessment, Posture Screening & Special Population Programming',
      'Business of Personal Training: Pricing, Client Retention & Online Coaching Funnels',
      'Direct WhatsApp access to Academy Master Lecturers and Faculty Board',
      'Includes printed course manuals, physical diploma certificate & ID badge',
    ],
    durationTotal: '45+ Hours of Clinical Lectures & Case Studies',
    lessonsCount: 110,
    downloadablesCount: 52,
    certificateIncluded: true,
    bestFor: 'Trainers wanting legitimate accreditation and gym trainers seeking higher client income.',
    instructor: {
      name: 'HSA Academic Faculty & Jeet Selal',
      role: 'Board of Biomechanics & Sports Science Educators',
      credentials: 'CSCS, MSc Exercise Physiologists, Orthopaedic Clinicians & HSA Master Faculty',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543203',
      whatsappMessage: 'Hello HSA Faculty, I am enrolling in the HSCMT Certified Master Trainer Diploma and need the exam syllabus schedule.',
      email: 'academy@himalayanstallion.in',
      responseRate: 'Replies within 2 hours during Academic Hours',
      officeHours: 'Live Practical Seminars every Saturday 3:00 PM - 5:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Human Musculoskeletal Anatomy & Applied Kinesiology',
        duration: '12 hrs',
        lessons: [
          { title: 'Skeletal Articulations: Planes of Motion & Joint Axes', duration: '45:10', type: 'video', freePreview: true },
          { title: 'Spine Mechanics: Shear Forces, Axial Compression & Disc Preservation', duration: '52:00', type: 'video', freePreview: true },
          { title: 'Shoulder Complex: Scapulohumeral Rhythm and Subacromial Impingement', duration: '48:30', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Client Posture Screening & Biomechanical Assessment',
        duration: '15 hrs',
        lessons: [
          { title: 'Overhead Squat Assessment: Identifying Overactive & Underactive Chains', duration: '44:00', type: 'video' },
          { title: 'Upper & Lower Crossed Syndromes Correction Protocol', duration: '50:15', type: 'video' },
          { title: 'Standard Client Intake, Par-Q & Medical Clearance Protocols', duration: 'PDF', type: 'template' },
        ],
      },
      {
        moduleTitle: 'Module 3: The 6-Figure Personal Training Business Architecture',
        duration: '8 hrs',
        lessons: [
          { title: 'How to Position High-Ticket 1-on-1 Training in Commercial Gyms', duration: '40:00', type: 'video' },
          { title: 'Online Coaching Tech Stack: Video Reviews, Check-in Forms & Stripe/UPI', duration: '38:00', type: 'video' },
          { title: 'Final HSCMT Certification Exam & Practical Case Defense', duration: 'Exam', type: 'quiz' },
        ],
      },
    ],
  },
  {
    id: 'course-guru-mann-pure-mass-nutrition',
    title: 'Pure Mass & Indian Sports Nutrition Mastery',
    subtitle:
      'Guru Mann’s legendary comprehensive nutrition and lean mass building blueprint. Master daily macro split calculations, vegetarian and non-vegetarian muscle meals, and drug-free Indian bodybuilding.',
    category: 'nutrition',
    categoryLabel: 'Nutrition & Diet',
    level: 'All Levels',
    rating: 4.8,
    reviewsCount: 3120,
    studentsEnrolled: 24500,
    priceInr: 1899,
    originalPriceInr: 4999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Guru Mann Fitness',
      subscribers: '2.4M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@GuruMannFitness',
      badgeLabel: 'Fit India Pioneer',
    },
    logoBadge: {
      iconName: 'flame',
      gradient: 'from-[#F59E0B] to-[#D97706]',
      accentColor: '#F59E0B',
    },
    highlights: [
      'Grounded in Guru Mann’s 20+ years of natural training philosophy',
      'Pure Indian vegetarian high-protein combinations without bloating',
      'Step-by-step TDEE & clean bulking calorie surplus calculation',
      'Supplements unmasked: What to take, when to take, and what to avoid',
      'Direct WhatsApp helpline with certified Guru Mann Fitness coaches',
    ],
    durationTotal: '9.2 hours of video',
    lessonsCount: 46,
    downloadablesCount: 20,
    certificateIncluded: true,
    bestFor: 'Hardgainers and Indian lifters wanting clean muscle gain on authentic home-cooked meals.',
    instructor: {
      name: 'Guru Mann',
      role: 'Certified Strength & Conditioning Specialist, Nutritionist',
      credentials: 'CSCS (USA), Certified Sports Nutritionist, Author & Fitness Pioneer (2.4M+ Followers)',
      avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543204',
      whatsappMessage: 'Hi Guru Mann Sir, I have joined your Pure Mass Nutrition Masterclass and want feedback on my macro ratios.',
      email: 'contact@gurumann.com',
      responseRate: 'Usually replies within 3 hours',
      officeHours: 'Live Q&A Nutrition Sessions every Tuesday at 8:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Foundations of Pure Mass Building',
        duration: '1 hr 45 mins',
        lessons: [
          { title: 'Why Dirty Bulking Destroys Insulin Sensitivity', duration: '18:30', type: 'video', freePreview: true },
          { title: 'The Clean Surplus Sweet Spot: +300 to +400 Calories', duration: '20:15', type: 'video', freePreview: true },
          { title: 'Digestive Enzymes, Gut Health & Maximizing Nutrient Absorption', duration: '22:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Indian Macro Kitchen Masterclass',
        duration: '3 hrs 20 mins',
        lessons: [
          { title: 'Soya Chunks, Paneer, Dals & Eggs: Real Bioavailability Scores', duration: '25:10', type: 'video' },
          { title: 'High Protein Indian Breakfast, Lunch & Dinner Blueprints', duration: '30:40', type: 'video' },
          { title: 'Meal Prep for Office & College Students with Zero Cooking Hassle', duration: '24:30', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-yash-sharma-natural-hypertrophy',
    title: 'Science of Natural Hypertrophy & Progressive Overload',
    subtitle:
      'Master the physics and biomechanics of progressive overload with Yash Sharma. Learn exercise execution that builds maximum muscle while bulletproofing joints from gym injuries.',
    category: 'hypertrophy',
    categoryLabel: 'Hypertrophy Fundamentals',
    level: 'Absolute Beginner',
    rating: 4.8,
    reviewsCount: 1940,
    studentsEnrolled: 15200,
    priceInr: 1499,
    originalPriceInr: 4499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Yash Sharma Fitness',
      subscribers: '1.1M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@YashSharmaFitness',
      badgeLabel: 'Science-Based Educator',
    },
    logoBadge: {
      iconName: 'dumbbell',
      gradient: 'from-[#FF6B1A] to-[#FF8833]',
      accentColor: '#FF6B1A',
    },
    highlights: [
      'Grounded in modern natural bodybuilding and evidence-based biomechanics',
      'Master the big compound lifts: Squat, Bench, Row & Overhead Press',
      'Logbook tracking methods to guarantee strength gains every single week',
      'Dumbbell and barbell substitutes for every commercial machine',
      'Direct WhatsApp instructor contact for personalized form checks',
    ],
    durationTotal: '7.5 hours of video',
    lessonsCount: 44,
    downloadablesCount: 16,
    certificateIncluded: true,
    bestFor: 'Beginners and intermediate lifters looking for the best ₹1,500 budget scientific course.',
    instructor: {
      name: 'Yash Sharma',
      role: 'Natural Bodybuilder & Fitness Author',
      credentials: 'ISSA Certified Fitness Trainer, CSCS Specialist & Author (1.1M+ YouTube Community)',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543205',
      whatsappMessage: 'Hi Yash, I enrolled in your Natural Hypertrophy course and have a query about my progressive overload logbook.',
      email: 'yash@yashsharmafitness.com',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Form Critique Workshops on Alternate Thursdays at 7:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Progressive Overload Operating System',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'The 3 Variables of Progressive Overload (Load, Reps, Execution Quality)', duration: '18:40', type: 'video', freePreview: true },
          { title: 'How to Keep a Training Logbook Like an Elite Scientist', duration: '16:20', type: 'video', freePreview: true },
          { title: 'The Double Progression Model Explained', duration: '20:10', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Flawless Lifting Technique Breakdown',
        duration: '3 hrs 15 mins',
        lessons: [
          { title: 'Barbell Squat: Finding Your Hip Socket Angle (No Butt Wink)', duration: '24:00', type: 'video' },
          { title: 'Flat Bench Press: Scapular Retraction & Arc Trajectory', duration: '22:15', type: 'video' },
          { title: 'Romanian Deadlift: Hip Hinge vs Squatting the Weight', duration: '25:30', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-dr-mike-israetel-biomechanics-masterclass',
    title: 'Dr. Mike Israetel: Advanced Hypertrophy Biomechanics & Periodization',
    subtitle:
      'The ultimate doctoral-level masterclass by Dr. Mike Israetel (Renaissance Periodization). Learn volume landmarks (MEV, MAV, MRV), lengthened partial rep dynamics, and stimulus-to-fatigue optimization.',
    category: 'biomechanics',
    categoryLabel: 'Exercise Physiology Masterclass',
    level: 'Advanced Pro',
    rating: 5.0,
    reviewsCount: 1120,
    studentsEnrolled: 3200,
    priceInr: 31999,
    originalPriceInr: 52000,
    isEliteMentorship: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Renaissance Periodization',
      subscribers: '2.6M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@RPStrength',
      badgeLabel: 'Exercise Science Doctorate',
    },
    logoBadge: {
      iconName: 'zap',
      gradient: 'from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95]',
      accentColor: '#8B5CF6',
    },
    highlights: [
      'Authored by Dr. Mike Israetel, PhD in Sport Physiology & RP Co-Founder',
      'Precise set volume prescription: Minimum Effective (MEV) vs Maximum Recoverable (MRV)',
      'Scientific breakthrough: Lengthened partial repetitions for 15-20% greater hypertrophy',
      'Comprehensive 4-week mesocycle design spreadsheets and reactive deload algorithms',
      'Exclusive RP Clinician WhatsApp Study Group & bi-weekly live seminar Q&As',
    ],
    durationTotal: '22 Hours of Advanced Doctoral Lectures',
    lessonsCount: 72,
    downloadablesCount: 35,
    certificateIncluded: true,
    bestFor: 'Strength coaches, advanced bodybuilders, and sports scientists demanding uncompromising physiology rigor.',
    instructor: {
      name: 'Dr. Mike Israetel, PhD',
      role: 'Co-Founder RP Strength & Professor of Exercise Science',
      credentials: 'PhD in Sport Physiology (East Tennessee State Univ), Former Collegiate Powerlifting Coach',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543206',
      whatsappMessage: 'Greetings Dr. Mike, I am taking your RP Biomechanics Masterclass and have an inquiry regarding my mesocycle MRV tracking.',
      email: 'consult@rpstrength.com',
      responseRate: 'Replies within 4 hours via RP Physiology Staff',
      officeHours: 'Bi-Weekly Advanced Science Mastermind every Sunday at 9:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Physics of Muscle Hypertrophy',
        duration: '4 hrs',
        lessons: [
          { title: 'Mechanical Tension: Passive Stretch vs Active Tension Cross-bridges', duration: '35:20', type: 'video', freePreview: true },
          { title: 'Stimulus-to-Fatigue Ratio (SFR): Maximizing Muscle Disruption per Unit Fatigue', duration: '40:10', type: 'video', freePreview: true },
          { title: 'Why Muscle Damage is NOT a Primary Driver of Growth in 2026', duration: '32:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Volume Landmarks & Autoregulation Algorithms',
        duration: '6 hrs',
        lessons: [
          { title: 'Calculating Your Individual MEV, MAV, and MRV per Muscle Group', duration: '48:30', type: 'video' },
          { title: 'Reps in Reserve (RIR 3 to RIR 0): Proximity to Failure Calibrations', duration: '42:15', type: 'video' },
          { title: 'RP 12-Week Periodized Excel Macro Generator', duration: 'Excel', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-athlean-x-joint-sparing-masterclass',
    title: 'ATHLEAN-X: Total Athletic Conditioning & Joint Longevity',
    subtitle:
      'Train like an athlete without wrecking your shoulders, knees, or lower back. Jeff Cavaliere (former NY Mets Head Physical Therapist) brings 13.5M followers the exact blueprint for pain-free athleticism.',
    category: 'biomechanics',
    categoryLabel: 'Physical Therapy & Conditioning',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 4500,
    studentsEnrolled: 31000,
    priceInr: 14999,
    originalPriceInr: 24999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'ATHLEAN-X™',
      subscribers: '13.5M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@athleanx',
      badgeLabel: '13.5M Global Fitness Icon',
    },
    logoBadge: {
      iconName: 'shield',
      gradient: 'from-[#DC2626] to-[#991B1B]',
      accentColor: '#DC2626',
    },
    highlights: [
      'Created by Jeff Cavaliere, MSPT, CSCS (Former MLB Head Physical Therapist)',
      'Subacromial impingement cures: The 30° scapular plane pressing rule',
      'Patellofemoral knee cartilage protection protocols (90° buffer & VMO targeting)',
      'Eliminate lower back pain with the McGill Big 3 + anti-rotational core sequences',
      'Direct WhatsApp helpline with certified physical therapy exercise specialists',
    ],
    durationTotal: '11.5 hours of video',
    lessonsCount: 58,
    downloadablesCount: 22,
    certificateIncluded: true,
    bestFor: 'Anyone with previous joint injuries, back twinges, or wanting elite athletic conditioning.',
    instructor: {
      name: 'Jeff Cavaliere, MSPT, CSCS',
      role: 'Founder ATHLEAN-X & Physical Therapist',
      credentials: 'Master of Science in Physical Therapy, CSCS, Former Head PT for New York Mets',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543207',
      whatsappMessage: 'Hi Jeff, I enrolled in the ATHLEAN-X Joint Sparing program and want to review my shoulder rehabilitation routine.',
      email: 'support@athleanx.com',
      responseRate: 'Usually replies within 3 hours',
      officeHours: 'Live Biomechanics Injury Clinic every Wednesday at 8:30 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Rotator Cuff & Bulletproof Shoulders',
        duration: '2 hrs 20 mins',
        lessons: [
          { title: 'The Face Pull: External Humeral Rotation Mistakes You Must Stop', duration: '18:40', type: 'video', freePreview: true },
          { title: 'Bench Press Angle Fix: Neutral Grips and Scapular Depression', duration: '22:15', type: 'video', freePreview: true },
          { title: 'Rotator Cuff Prehab Flow (Sleeper Stretch & Y-T-W Raises)', duration: '20:00', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Lower Back & Spine Preservation Protocols',
        duration: '2 hrs 45 mins',
        lessons: [
          { title: 'Why Squats Hurt: Shear Stress vs Compressive Stress', duration: '26:10', type: 'video' },
          { title: 'Chest-Supported Substitutions for Bent-Over Barbell Rows', duration: '21:30', type: 'video' },
          { title: 'Pallof Press & Anti-Extension Core Sequences', duration: '19:40', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-saket-gokhale-calisthenics-aesthetics',
    title: 'Aesthetic Physique & Living Room Calisthenics Mastery',
    subtitle:
      'Build a lean, shredded, athletic physique using zero gym equipment. Saket Gokhale teaches step-by-step bodyweight strength progressions from wall push-ups to clean pull-ups and muscle-ups.',
    category: 'calisthenics',
    categoryLabel: 'Home Calisthenics & Aesthetics',
    level: 'Absolute Beginner',
    rating: 4.8,
    reviewsCount: 1650,
    studentsEnrolled: 13800,
    priceInr: 2499,
    originalPriceInr: 5999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Saket Gokhale',
      subscribers: '1.2M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@SaketGokhaleVlogs',
      badgeLabel: 'Calisthenics & Lifestyle Coach',
    },
    logoBadge: {
      iconName: 'activity',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]',
      accentColor: '#3B82F6',
    },
    highlights: [
      'Zero gym membership required — train in your living room or park',
      'Step-by-step progressive ladder: Push-ups, Dips, Pull-ups & Handstands',
      'Desk worker posture correction: Open tight shoulders and activate glutes',
      'Flexible lifestyle diet blueprint: Eat home-cooked food and stay shredded',
      'Direct WhatsApp instructor chat for weekly video form feedback',
    ],
    durationTotal: '6.8 hours of video',
    lessonsCount: 38,
    downloadablesCount: 15,
    certificateIncluded: true,
    bestFor: 'College students, remote workers, and calisthenics lovers who prefer bodyweight mastery.',
    instructor: {
      name: 'Saket Gokhale',
      role: 'Calisthenics Athlete & Lifestyle Creator',
      credentials: 'National Calisthenics Advocate & Fitness Creator (1.2M+ Community)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543208',
      whatsappMessage: 'Hey Saket, I enrolled in your Calisthenics course and want to share my first pull-up progression video.',
      email: 'saket@gokhalecrew.com',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Calisthenics Form Jam on Saturdays at 5:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Upper Body Push Progressions',
        duration: '1 hr 45 mins',
        lessons: [
          { title: 'The Scapular Push-Up: The Foundation of Shoulder Health', duration: '15:20', type: 'video', freePreview: true },
          { title: 'Standard Floor Push-Ups to Diamond & Archer Push-Ups', duration: '20:10', type: 'video', freePreview: true },
          { title: 'Parallel Bar Dips with Forward Chest Lean', duration: '18:40', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Complete Pull Progression & Hollow Body Core',
        duration: '2 hrs 10 mins',
        lessons: [
          { title: 'Doorframe & Bed Sheet Bodyweight Rows', duration: '19:00', type: 'video' },
          { title: 'Unlocking Your First Strict Chin-Up & Pull-Up', duration: '24:15', type: 'video' },
          { title: 'Gymnastic Hollow Body Hold & L-Sit Progressions', duration: '21:30', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-jeff-nippard-push-pull-legs-mastery',
    title: 'Jeff Nippard: Evidence-Based Push Pull Legs & Technique Mastery',
    subtitle:
      'The scientific breakdown of every major gym lift with Jeff Nippard (BSc Biochemistry, Drug-Free Pro Bodybuilder). High-definition biomechanical animations and EMG science for chest, back, and legs.',
    category: 'hypertrophy',
    categoryLabel: 'Scientific Hypertrophy',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 3900,
    studentsEnrolled: 26000,
    priceInr: 2999,
    originalPriceInr: 6999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Jeff Nippard',
      subscribers: '5.2M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@JeffNippard',
      badgeLabel: '5.2M Science Leader',
    },
    logoBadge: {
      iconName: 'zap',
      gradient: 'from-[#0284C7] to-[#0369A1]',
      accentColor: '#0284C7',
    },
    highlights: [
      'Authored by Jeff Nippard, BSc Biochemistry & Drug-Free Pro Bodybuilder',
      '3D Anatomy animations showing muscle recruitment across different angles',
      'The definitive Push/Pull/Legs periodized 5-day and 6-day split templates',
      'Safe warm-up protocol and potentiation sets before heavy lifting',
      'Direct WhatsApp helpline with certified exercise science assistants',
    ],
    durationTotal: '10.5 hours of video',
    lessonsCount: 50,
    downloadablesCount: 18,
    certificateIncluded: true,
    bestFor: 'Lifters who love detailed scientific breakdowns and clean anatomy animations.',
    instructor: {
      name: 'Jeff Nippard',
      role: 'BSc Biochemistry & Natural Bodybuilding Champion',
      credentials: 'BSc Biochemistry, Drug-Free Pro Bodybuilder & Science Educator (5.2M+ Community)',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543209',
      whatsappMessage: 'Hi Jeff, I enrolled in your Push Pull Legs Science Masterclass and want to check my split volume distribution.',
      email: 'help@jeffnippard.com',
      responseRate: 'Replies within 3 hours',
      officeHours: 'Monthly Live Scientific Technique Review every 1st Sunday',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Push Workout Science',
        duration: '2 hrs 30 mins',
        lessons: [
          { title: 'Incline Dumbbell Press: 30° vs 45° Clavicular Head Activation', duration: '22:10', type: 'video', freePreview: true },
          { title: 'Cable Lateral Raise at Hand-Height vs Ankle-Height', duration: '18:40', type: 'video', freePreview: true },
          { title: 'Overhead Cable Triceps Extension: Long Head Anatomy', duration: '19:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: The Pull Workout Science',
        duration: '2 hrs 45 mins',
        lessons: [
          { title: 'Neutral Grip Lat Pulldown vs Wide Overhand Pulldown', duration: '24:10', type: 'video' },
          { title: 'Chest-Supported T-Bar Row for Mid-Traps & Rhomboids', duration: '20:50', type: 'video' },
          { title: 'Incline Dumbbell Biceps Curl for Peak Stretch Tension', duration: '18:15', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'course-abhinav-mahajan-fat-loss-intermittent-fasting',
    title: 'Sustainable Fat Loss, Intermittent Fasting & Lifestyle Mastery',
    subtitle:
      'Lose body fat permanently without extreme starvation or boring salads. Abhinav Mahajan breaks down science-backed intermittent fasting, metabolic flexibility, and realistic dining-out strategies.',
    category: 'nutrition',
    categoryLabel: 'Nutrition & Fat Loss',
    level: 'Absolute Beginner',
    rating: 4.8,
    reviewsCount: 2210,
    studentsEnrolled: 18900,
    priceInr: 1500,
    originalPriceInr: 3999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Abhinav Mahajan',
      subscribers: '2.1M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@AbhinavMahajan',
      badgeLabel: 'Lifestyle Transformation Pioneer',
    },
    logoBadge: {
      iconName: 'flame',
      gradient: 'from-[#F59E0B] to-[#EF4444]',
      accentColor: '#F59E0B',
    },
    highlights: [
      '16:8 and 14:10 Intermittent Fasting frameworks designed for busy schedules',
      'How to eat at restaurants and weddings without derailing your fat loss',
      'Curbing evening sweet tooth cravings with low-calorie high-volume snacks',
      'Simple steps to maintain high NEAT (Non-Exercise Activity Thermogenesis)',
      'Direct WhatsApp instructor access for instant daily meal accountability',
    ],
    durationTotal: '5.8 hours of video',
    lessonsCount: 36,
    downloadablesCount: 14,
    certificateIncluded: true,
    bestFor: 'Busy professionals and beginners who want sustainable fat loss around ₹1,500.',
    instructor: {
      name: 'Abhinav Mahajan',
      role: 'Lifestyle Transformation Coach & Author',
      credentials: 'Certified Personal Trainer & Nutrition Coach (2.1M+ YouTube Community)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543210',
      whatsappMessage: 'Hi Abhinav, I enrolled in your Fat Loss & Fasting course and want to confirm my fasting eating window.',
      email: 'team@abhinavmahajan.com',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Lifestyle Coaching Q&A on Wednesdays at 7:30 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Biology of Fat Loss & Intermittent Fasting',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'Insulin Sensitivity, Growth Hormone & The Fasting Window', duration: '18:40', type: 'video', freePreview: true },
          { title: '16:8 Protocol vs 14:10: Choosing What Fits Your Work Routine', duration: '20:10', type: 'video', freePreview: true },
          { title: 'What Breaks a Fast (Black Coffee, Electrolytes & Green Tea)', duration: '15:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: High-Volume Desi Meals & Craving Control',
        duration: '2 hrs 15 mins',
        lessons: [
          { title: 'The Secret of High-Volume Low-Calorie Indian Cooking', duration: '24:00', type: 'video' },
          { title: 'How to Navigate Social Dinners, Buffets & Family Parties', duration: '22:30', type: 'video' },
          { title: 'Downloadable 60-Day Fat Loss Meal Tracker', duration: 'PDF', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-tarun-gill-budget-gym-blueprint',
    title: 'Tarun Gill: Zero-Excuses Beginner Gym & Budget Indian Bodybuilding',
    subtitle:
      'The no-BS, street-smart gym guide by Tarun Gill. Learn how to walk into any local gym with total confidence, navigate iron machines, and hit your protein target on a ₹100/day desi grocery budget.',
    category: 'beginner',
    categoryLabel: 'Beginner Fundamentals',
    level: 'Absolute Beginner',
    rating: 4.8,
    reviewsCount: 2680,
    studentsEnrolled: 21400,
    priceInr: 1499,
    originalPriceInr: 3499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Tarun Gill Fitness',
      subscribers: '1.6M Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@TarunGillFitness',
      badgeLabel: 'Desi Fitness Pioneer',
    },
    logoBadge: {
      iconName: 'dumbbell',
      gradient: 'from-[#FF6B1A] to-[#C2410C]',
      accentColor: '#FF6B1A',
    },
    highlights: [
      'Zero gym intimidation — master every machine pin, cable pulley & bench',
      'Desi budget diet: Sattu, Eggs, Soya Chunks, Chana & Doodh for ₹100/day',
      'The 3-Day Full Body iron routine for maximum beginner strength gains',
      'Gym etiquette, locker room essentials, and injury prevention',
      'Direct WhatsApp instructor contact with experienced Indian trainers',
    ],
    durationTotal: '6.2 hours of video',
    lessonsCount: 40,
    downloadablesCount: 12,
    certificateIncluded: true,
    bestFor: 'College students, first-time gym goers, and anyone on a budget wanting a top ₹1,499 course.',
    instructor: {
      name: 'Tarun Gill',
      role: 'Fitness Presenter & Strength Coach',
      credentials: 'Founder TG Fitness, Fitness Pioneer & Author (1.6M+ YouTube Community)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543211',
      whatsappMessage: 'Ram Ram Tarun Bhai, I enrolled in your Beginner Gym Blueprint and need guidance on my first week split.',
      email: 'tarun@tarungill.com',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Sunday Motivation & Form Jam at 10:00 AM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: The Zero-Intimidation Gym Walkthrough',
        duration: '1 hr 30 mins',
        lessons: [
          { title: 'De-mystifying the Gym Floor: Where to Start on Day 1', duration: '18:40', type: 'video', freePreview: true },
          { title: 'How to Adjust Every Gym Machine Without Feeling Shy', duration: '24:10', type: 'video', freePreview: true },
          { title: 'Gym Etiquette & Locker Room Rules Every Beginner Must Know', duration: '14:20', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: The ₹100/Day Desi Protein Kitchen',
        duration: '2 hrs 00 mins',
        lessons: [
          { title: 'Eggs, Soya, Sattu, Paneer: Hitting 100g+ Protein on a Budget', duration: '28:30', type: 'video' },
          { title: 'Pre-Workout & Post-Workout Meals Using Real Home Foods', duration: '22:15', type: 'video' },
          { title: 'Beginner 3-Day Full Body Progressive Workout Schedule', duration: 'PDF', type: 'template' },
        ],
      },
    ],
  },
  {
    id: 'course-pooja-iyer-female-strength-glutes',
    title: 'Women’s Strength, Hormonal Cycles & Glute Specialization',
    subtitle:
      'Evidence-based strength training tailored specifically for female physiology. Learn cycle-synced lifting through follicular and luteal phases, pelvic floor safety, and aesthetic glute hypertrophy.',
    category: 'female_fitness',
    categoryLabel: 'Female Health & Strength',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 1840,
    studentsEnrolled: 14200,
    priceInr: 1499,
    originalPriceInr: 3999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    channelInfo: {
      channelName: 'Women’s Strength Collective',
      subscribers: '850K Subscribers',
      verified: true,
      channelAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      youtubeHandle: '@WomensStrengthHub',
      badgeLabel: 'Female Physiology Specialists',
    },
    logoBadge: {
      iconName: 'sparkles',
      gradient: 'from-[#EC4899] to-[#BE185D]',
      accentColor: '#EC4899',
    },
    highlights: [
      'Cycle-synced resistance training: Maximize strength during follicular peak',
      'The complete biomechanics of Barbell Hip Thrusts, RDLs & Hyperextensions',
      'Pelvic floor and intra-abdominal pressure safety for women of all ages',
      'Overcoming common myths about "getting bulky" from lifting heavy weights',
      'Private female coach WhatsApp hotline for confidential questions',
    ],
    durationTotal: '6.5 hours of video',
    lessonsCount: 42,
    downloadablesCount: 16,
    certificateIncluded: true,
    bestFor: 'Women who want to build real strength, sculpt glutes, and understand hormonal phases.',
    instructor: {
      name: 'Pooja Iyer, CSCS',
      role: 'Women’s Health & Strength Specialist',
      credentials: 'CSCS (NSCA), Pre & Postnatal Certified Fitness Specialist (850K+ Community)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      whatsappNumber: '+919876543212',
      whatsappMessage: 'Hi Pooja, I enrolled in the Women’s Strength course and have a query about cycle phase training adjustments.',
      email: 'pooja.cscs@fitnessintelligence.io',
      responseRate: 'Usually replies within 2 hours',
      officeHours: 'Live Women’s Strength Circle every Thursday at 6:00 PM IST',
    },
    curriculum: [
      {
        moduleTitle: 'Module 1: Female Hormonal Blueprint & Training Cycles',
        duration: '1 hr 45 mins',
        lessons: [
          { title: 'Estrogen, Progesterone & Energy Fluctuations Throughout the Month', duration: '20:15', type: 'video', freePreview: true },
          { title: 'Follicular Phase: Your Peak Strength Window for Heavy Lifts', duration: '18:40', type: 'video', freePreview: true },
          { title: 'Luteal Phase: Deloading and Core Recovery Strategies', duration: '16:30', type: 'video' },
        ],
      },
      {
        moduleTitle: 'Module 2: Complete Glute Biomechanics & Execution',
        duration: '2 hrs 30 mins',
        lessons: [
          { title: 'Barbell Hip Thrust: Chin Tucked & Posterior Pelvic Tilt Mechanics', duration: '24:10', type: 'video' },
          { title: 'Romanian Deadlift for Upper Glute & Hamstring Tie-In', duration: '22:30', type: 'video' },
          { title: '45° Hyperextension with Rounded Thoracic Bias for Glutes', duration: '19:40', type: 'video' },
        ],
      },
    ],
  },
];

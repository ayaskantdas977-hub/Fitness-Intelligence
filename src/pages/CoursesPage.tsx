import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Star,
  Sparkles,
  CheckCircle2,
  Lock,
  MessageCircle,
  Mail,
  CreditCard,
  Smartphone,
  Building,
  Check,
  X,
  BookOpen,
  Award,
  SlidersHorizontal,
  ExternalLink,
  PlayCircle,
  FileText,
  UserCheck,
  Video,
} from 'lucide-react';
import { COURSES_CATALOG, type Course } from '../data/coursesData';
import { useToast } from '../context/ToastContext';

export const CoursesPage: React.FC = () => {
  const { showToast } = useToast();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'around1500' | 'under3000' | 'midrange' | 'premium'>('all');
  const [maxPriceRange, setMaxPriceRange] = useState<number>(40000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price_low' | 'price_high'>('popular');
  const [activeTab, setActiveTab] = useState<'catalog' | 'my_courses'>('catalog');

  // Enrolled courses stored in localStorage
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fi_enrolled_courses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<Course | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessCourse, setPaymentSuccessCourse] = useState<Course | null>(null);

  // Lesson player modal
  const [activeLessonPlayer, setActiveLessonPlayer] = useState<{
    course: Course;
    lessonTitle: string;
    moduleTitle: string;
  } | null>(null);

  // Save enrolled courses
  useEffect(() => {
    localStorage.setItem('fi_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  // Filtered & Sorted catalog
  const filteredCourses = useMemo(() => {
    return COURSES_CATALOG.filter((course) => {
      // Category filter
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }

      // Keyword search (title, subtitle, instructor, channel name, youtube handle, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          course.title.toLowerCase().includes(q) ||
          course.subtitle.toLowerCase().includes(q) ||
          course.instructor.name.toLowerCase().includes(q) ||
          course.categoryLabel.toLowerCase().includes(q) ||
          course.bestFor.toLowerCase().includes(q) ||
          course.channelInfo.channelName.toLowerCase().includes(q) ||
          course.channelInfo.youtubeHandle.toLowerCase().includes(q) ||
          (q === '1500' && (course.priceInr === 1500 || course.priceInr === 1499)) ||
          (q.includes('30000') && course.priceInr >= 29000);
        if (!matches) return false;
      }

      // Preset Price Filters
      if (priceFilter === 'around1500' && (course.priceInr < 1400 || course.priceInr > 1600)) return false;
      if (priceFilter === 'under3000' && course.priceInr > 3000) return false;
      if (priceFilter === 'midrange' && (course.priceInr < 3000 || course.priceInr > 15000)) return false;
      if (priceFilter === 'premium' && course.priceInr < 20000) return false;

      // Price slider
      if (course.priceInr > maxPriceRange) return false;

      // Min rating filter
      if (minRating > 0 && course.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.studentsEnrolled - a.studentsEnrolled;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.priceInr - b.priceInr;
      if (sortBy === 'price_high') return b.priceInr - a.priceInr;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceFilter, maxPriceRange, minRating, sortBy]);

  const enrolledCourses = useMemo(() => {
    return COURSES_CATALOG.filter((c) => enrolledCourseIds.includes(c.id));
  }, [enrolledCourseIds]);

  // Handle direct payment confirmation
  const handleConfirmPayment = () => {
    if (!selectedCourseForPayment) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const course = selectedCourseForPayment;
      setEnrolledCourseIds((prev) => Array.from(new Set([...prev, course.id])));
      setPaymentSuccessCourse(course);
      setSelectedCourseForPayment(null);
      showToast(`Payment successful! You are now enrolled in "${course.title}".`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Top Hero Header: Academy & Creator Masterclasses */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0F0B09] via-[#1F140E] to-[#0F0B09] border border-[#FF6B1A]/30 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B1A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B1A]/20 border border-[#FF6B1A]/40 text-[#FFB547] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#FF6B1A]" />
            <span>Fitness Intelligence Academy • Creator Masterclasses & Elite Mentorships</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Learn from India & Global Top Fitness Creators & Biomechanics Experts.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
            Access authentic masterclasses and personal mentorships from verified educators like{' '}
            <strong>Jeet Selal (Himalayan Stallion)</strong>, <strong>Guru Mann</strong>,{' '}
            <strong>Dr. Mike Israetel (RP Strength)</strong>, and certified clinicians. From ₹1,499 budget fundamentals
            to ₹30,000+ elite 1-on-1 mentorship programs and internationally recognized trainer diplomas.
          </p>

          {/* Quick tab switcher: Browse Catalog vs My Enrolled Courses */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-[#FF6B1A] text-white shadow-lg shadow-[#FF6B1A]/30'
                  : 'bg-white/10 hover:bg-white/15 text-zinc-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Masterclasses ({COURSES_CATALOG.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('my_courses')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'my_courses'
                  ? 'bg-[#FF6B1A] text-white shadow-lg shadow-[#FF6B1A]/30'
                  : 'bg-white/10 hover:bg-white/15 text-zinc-300'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>My Enrolled Courses ({enrolledCourses.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Search, Price & Category Toolbar */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
            {/* Row 1: Search Bar & Preset Price Filters */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Search by creator (Jeet Selal, Guru Mann), topic, or '1500' / '30000'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] placeholder-[var(--muted)]/60 focus:outline-none focus:border-[#FF6B1A] transition-colors"
                />
              </div>

              {/* Price Filter Pills (including sweet-spot ₹1,500 and ₹30,000+ elite) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <span className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mr-1 shrink-0">
                  Price:
                </span>
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'around1500', label: '⭐ Around ₹1,500 (Budget Sweet Spot)' },
                  { id: 'under3000', label: 'Under ₹3,000' },
                  { id: 'midrange', label: '₹3,000 – ₹15,000' },
                  { id: 'premium', label: '👑 ₹20,000 – ₹35,000+ (Elite Mentorship)' },
                ].map((pf) => (
                  <button
                    key={pf.id}
                    type="button"
                    onClick={() => setPriceFilter(pf.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[34px] ${
                      priceFilter === pf.id
                        ? 'bg-[#FF6B1A] text-white shadow-sm'
                        : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)]'
                    }`}
                  >
                    {pf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[var(--border)]">
              <span className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mr-1 shrink-0">
                Category:
              </span>
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'hypertrophy', label: 'Natural Hypertrophy' },
                { id: 'mentorship', label: '1-on-1 Mentorship' },
                { id: 'biomechanics', label: 'Biomechanics & Certifications' },
                { id: 'nutrition', label: 'Nutrition & Fat Loss' },
                { id: 'calisthenics', label: 'Home Calisthenics' },
                { id: 'beginner', label: 'Beginner Gym' },
                { id: 'female_fitness', label: 'Female Health & Strength' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[32px] ${
                    selectedCategory === cat.id
                      ? 'bg-[#FF6B1A]/20 text-[#EA580C] dark:text-[#FFB547] border border-[#FF6B1A]/40 font-bold'
                      : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Row 3: Advanced Sliders & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[var(--border)] text-xs text-[var(--muted)]">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Max Price Range Slider spanning up to ₹40,000 */}
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B1A]" />
                  <span>Max Budget: <strong>₹{maxPriceRange.toLocaleString()}</strong></span>
                  <input
                    type="range"
                    min="1000"
                    max="40000"
                    step="500"
                    value={maxPriceRange}
                    onChange={(e) => setMaxPriceRange(Number(e.target.value))}
                    className="accent-[#FF6B1A] w-28 sm:w-36 cursor-pointer"
                  />
                </div>

                {/* Rating Filter */}
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-lg px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4.8}>4.8★ and above</option>
                    <option value={4.9}>4.9★ and above</option>
                  </select>
                </div>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-lg px-2.5 py-1 text-xs focus:outline-none font-medium"
                >
                  <option value="popular">Most Popular (Enrolled)</option>
                  <option value="rating">Highest Rated (4.8 - 5.0★)</option>
                  <option value="price_low">Price: Low to High (₹1,499+)</option>
                  <option value="price_high">Price: High to Low (₹34,500+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              const isHighTicket = course.priceInr >= 20000;

              return (
                <div
                  key={course.id}
                  className={`rounded-2xl border ${
                    isHighTicket
                      ? 'border-amber-500/40 bg-gradient-to-b from-[var(--surface)] to-amber-950/10 shadow-md'
                      : 'border-[var(--border)] bg-[var(--surface)] shadow-sm'
                  } overflow-hidden hover:shadow-xl hover:border-[#FF6B1A]/50 transition-all flex flex-col justify-between group`}
                >
                  {/* Top Photographic Media Banner with Real Channel Logo & Badges */}
                  <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

                    {/* Top Row: Channel Badge & Category/Level Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
                      {/* Real Channel Avatar & Name */}
                      <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                        <img
                          src={course.channelInfo.channelAvatar}
                          alt={course.channelInfo.channelName}
                          className="w-7 h-7 rounded-full object-cover border border-white/70 shadow-sm shrink-0"
                        />
                        <div className="flex flex-col leading-tight pr-1">
                          <span className="text-[11px] font-bold text-white flex items-center gap-1">
                            {course.channelInfo.channelName}
                            {course.channelInfo.verified && (
                              <CheckCircle2 className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8]" />
                            )}
                          </span>
                          <span className="text-[9px] text-zinc-300 font-medium">
                            {course.channelInfo.subscribers}
                          </span>
                        </div>
                      </div>

                      {/* Prestige / Category Badges */}
                      <div className="flex flex-col items-end gap-1">
                        {isHighTicket ? (
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black text-[9px] font-black uppercase tracking-wider shadow-lg border border-amber-300 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-black fill-black" />
                            ELITE PRO
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                            {course.categoryLabel}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] text-zinc-200 font-medium">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Course Title inside Banner */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="text-[10px] font-bold text-[#FFB547] block mb-0.5">
                        {course.channelInfo.youtubeHandle}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#FFB547] transition-colors line-clamp-2 drop-shadow-md">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Subtitle / Description */}
                    <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">
                      {course.subtitle}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-2.5 pt-2 border-t border-[var(--border)]">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#FF6B1A]/40 shrink-0"
                      />
                      <div className="truncate flex-1">
                        <span className="text-xs font-bold text-[var(--text)] block truncate flex items-center gap-1">
                          {course.instructor.name}
                          <UserCheck className="w-3 h-3 text-[#FF6B1A]" />
                        </span>
                        <span className="text-[10px] text-[var(--muted)] block truncate">
                          {course.instructor.credentials}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating & Stats */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#EA580C] dark:text-[#FFB547] text-sm">
                          {course.rating.toFixed(1)}
                        </span>
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(course.rating)
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-amber-500/40'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[var(--muted)]">
                          ({course.reviewsCount.toLocaleString()})
                        </span>
                      </div>

                      <span className="text-[11px] text-[var(--muted)] font-medium">
                        {course.durationTotal}
                      </span>
                    </div>

                    {/* Direct Contact Teaser Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-xl ${
                        isHighTicket
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      } text-[11px] font-semibold flex items-center justify-between`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        {isHighTicket ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate">VIP 1-on-1 Zoom Calls & WhatsApp Hotline</span>
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">Direct WhatsApp Coach Support</span>
                          </>
                        )}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase shrink-0 ${
                          isHighTicket ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        Included
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-xl font-extrabold tabular-nums ${
                              isHighTicket ? 'text-amber-600 dark:text-amber-400' : 'text-[var(--text)]'
                            }`}
                          >
                            ₹{course.priceInr.toLocaleString()}
                          </span>
                          <span className="text-xs text-[var(--muted)] line-through">
                            ₹{course.originalPriceInr.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                          {Math.round(((course.originalPriceInr - course.priceInr) / course.originalPriceInr) * 100)}% OFF
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCourseForDetail(course)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition cursor-pointer"
                        >
                          Syllabus
                        </button>

                        {isEnrolled ? (
                          <button
                            type="button"
                            onClick={() => setActiveTab('my_courses')}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white shadow-sm transition flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Enrolled</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedCourseForPayment(course)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition cursor-pointer ${
                              isHighTicket
                                ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 shadow-amber-500/20 hover:brightness-110'
                                : 'bg-gradient-to-r from-[#FF6B1A] to-[#FF8833] shadow-[#FF6B1A]/20 hover:brightness-110'
                            }`}
                          >
                            {isHighTicket ? 'Enroll VIP' : 'Buy Course'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-[var(--muted)] mx-auto" />
              <h4 className="text-base font-bold text-[var(--text)]">No masterclasses found matching your criteria</h4>
              <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
                Try searching for "Jeet Selal", "Guru Mann", or selecting "All Prices" to explore the full catalog.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceFilter('all');
                  setMaxPriceRange(40000);
                  setMinRating(0);
                }}
                className="px-4 py-2 rounded-xl bg-[#FF6B1A] text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      ) : (
        /* "My Enrolled Courses" View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">My Enrolled Masterclasses</h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Lifetime access, interactive lessons, and direct WhatsApp instructor hotline.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="text-xs text-[#FF6B1A] font-bold hover:underline cursor-pointer"
            >
              + Browse more courses
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-4">
              <Award className="w-12 h-12 text-[#FF6B1A] mx-auto opacity-70" />
              <h3 className="text-base font-bold text-[var(--text)]">You haven't enrolled in any courses yet</h3>
              <p className="text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                If you are new to fitness, check out our best-selling masterclasses from Jeet Selal, Guru Mann, or Yash Sharma
                priced around ₹1,499.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B1A] text-white font-bold text-xs cursor-pointer shadow-lg shadow-[#FF6B1A]/25"
              >
                Browse Masterclasses Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border-2 border-emerald-500/30 bg-[var(--surface)] p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-14 h-14 rounded-xl object-cover border border-[var(--border)] shrink-0 shadow-md"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                            ✓ Enrolled & Active
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">• {course.channelInfo.channelName}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[var(--text)] leading-snug line-clamp-1">
                          {course.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                      <span>Course Progress:</span>
                      <span className="font-bold text-[var(--text)]">3 / {course.lessonsCount} lessons</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                    </div>
                  </div>

                  {/* Direct Instructor Contact Section */}
                  <div className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#FF6B1A]/50"
                        />
                        <span className="text-xs font-bold text-[var(--text)]">
                          {course.instructor.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--muted)]">
                        {course.instructor.responseRate}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={`https://wa.me/${course.instructor.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
                          course.instructor.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-500/30 transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:${course.instructor.email}?subject=Fitness%20Intelligence%20Course%20Query`}
                        className="px-3 py-1.5 rounded-lg bg-[var(--surface)] text-[var(--text)] text-xs font-semibold border border-[var(--border)] flex items-center gap-1.5 hover:border-[#FF6B1A] transition cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#FF6B1A]" />
                        <span>Email Coach</span>
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveLessonPlayer({
                          course,
                          lessonTitle: course.curriculum[0].lessons[0].title,
                          moduleTitle: course.curriculum[0].moduleTitle,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B1A] to-[#FF8833] text-white font-bold text-xs shadow-md shadow-[#FF6B1A]/20 flex items-center gap-2 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue Lesson</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCourseForDetail(course)}
                      className="text-xs text-[var(--muted)] hover:text-[var(--text)] font-semibold underline cursor-pointer"
                    >
                      View Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Course Curriculum & Instructor Details Modal */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header with Course Cover Banner & Channel Logo */}
            <div className="relative p-6 bg-zinc-950 text-white overflow-hidden">
              <img
                src={selectedCourseForDetail.thumbnailUrl}
                alt={selectedCourseForDetail.title}
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 space-y-3">
                {/* Creator Channel Tag */}
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-fit">
                  <img
                    src={selectedCourseForDetail.channelInfo.channelAvatar}
                    alt={selectedCourseForDetail.channelInfo.channelName}
                    className="w-5 h-5 rounded-full object-cover border border-white/60"
                  />
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    {selectedCourseForDetail.channelInfo.channelName}
                    {selectedCourseForDetail.channelInfo.verified && (
                      <CheckCircle2 className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8]" />
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-300">
                    • {selectedCourseForDetail.channelInfo.subscribers}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#FFB547] uppercase tracking-wider">
                  <span>{selectedCourseForDetail.categoryLabel}</span>
                  <span>•</span>
                  <span>{selectedCourseForDetail.level}</span>
                </div>

                <h2 className="text-xl font-bold pr-8 leading-snug">{selectedCourseForDetail.title}</h2>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedCourseForDetail.subtitle}
                </p>

                <div className="flex items-center gap-3 pt-1 text-xs">
                  <span className="flex items-center gap-1 font-bold text-[#FFB547]">
                    <Star className="w-3.5 h-3.5 fill-[#FFB547]" />
                    {selectedCourseForDetail.rating.toFixed(1)} ({selectedCourseForDetail.reviewsCount} reviews)
                  </span>
                  <span>•</span>
                  <span>{selectedCourseForDetail.durationTotal}</span>
                  <span>•</span>
                  <span>{selectedCourseForDetail.lessonsCount} lessons</span>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[var(--text)]">
              {/* Direct Instructor Contact Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF6B1A]/10 to-transparent border border-[#FF6B1A]/30 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B1A] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  Your Course Instructor & Direct Support Setup
                </span>

                <div className="flex items-start gap-3">
                  <img
                    src={selectedCourseForDetail.instructor.avatar}
                    alt={selectedCourseForDetail.instructor.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#FF6B1A]"
                  />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-sm text-[var(--text)]">
                      {selectedCourseForDetail.instructor.name}
                    </p>
                    <p className="text-[var(--muted)]">
                      {selectedCourseForDetail.instructor.credentials}
                    </p>
                    <p className="text-[11px] text-[var(--muted)]">
                      ⚡ {selectedCourseForDetail.instructor.responseRate} · {selectedCourseForDetail.instructor.officeHours}
                    </p>
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${selectedCourseForDetail.instructor.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
                      selectedCourseForDetail.instructor.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center gap-2 hover:bg-emerald-600 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Hotline</span>
                  </a>

                  <a
                    href={`mailto:${selectedCourseForDetail.instructor.email}`}
                    className="px-3.5 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--text)] text-xs font-semibold border border-[var(--border)] flex items-center gap-2 hover:border-[#FF6B1A] transition cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#FF6B1A]" />
                    <span>Email Consultation</span>
                  </a>
                </div>
              </div>

              {/* What You'll Learn Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  What You'll Learn & Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedCourseForDetail.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-[var(--text)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Course Content & Modules ({selectedCourseForDetail.curriculum.length} Modules)
                </h4>

                <div className="space-y-2.5">
                  {selectedCourseForDetail.curriculum.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[var(--text)]">
                        <span>{mod.moduleTitle}</span>
                        <span className="text-[11px] text-[var(--muted)]">{mod.duration}</span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {mod.lessons.map((les, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center justify-between text-xs text-[var(--muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
                          >
                            <div className="flex items-center gap-2">
                              {les.type === 'video' ? (
                                <PlayCircle className="w-3.5 h-3.5 text-[#FF6B1A]" />
                              ) : (
                                <FileText className="w-3.5 h-3.5 text-blue-400" />
                              )}
                              <span>{les.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {les.freePreview && (
                                <span className="px-1.5 py-0.2 rounded bg-[#FF6B1A]/20 text-[#EA580C] dark:text-[#FFB547] text-[9px] font-bold uppercase">
                                  Preview
                                </span>
                              )}
                              <span className="text-[10px] font-mono">{les.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer with Direct Buy Button */}
            <div className="p-4 sm:p-5 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[var(--muted)] block">Total Investment:</span>
                <span className="text-xl font-extrabold text-[var(--text)]">
                  ₹{selectedCourseForDetail.priceInr.toLocaleString()}
                </span>
              </div>

              {enrolledCourseIds.includes(selectedCourseForDetail.id) ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourseForDetail(null);
                    setActiveTab('my_courses');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Go to My Enrolled Courses
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const c = selectedCourseForDetail;
                    setSelectedCourseForDetail(null);
                    setSelectedCourseForPayment(c);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B1A] to-[#FF8833] text-white font-bold text-xs shadow-lg shadow-[#FF6B1A]/25 hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  Buy Now & Start Learning
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Direct Payment Checkout Modal */}
      {selectedCourseForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden text-[var(--text)] p-6 sm:p-8 space-y-6">
            <button
              type="button"
              onClick={() => setSelectedCourseForPayment(null)}
              className="absolute top-5 right-5 p-2 text-[var(--muted)] hover:text-[var(--text)] rounded-full hover:bg-[var(--surface-2)] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B1A] block">
                Instant In-App Checkout
              </span>
              <h3 className="text-xl font-extrabold tracking-tight mt-1">
                Enroll in Masterclass
              </h3>
            </div>

            {/* Selected Course Summary with Real Channel Badge */}
            <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCourseForPayment.channelInfo.channelAvatar}
                    alt={selectedCourseForPayment.channelInfo.channelName}
                    className="w-6 h-6 rounded-full object-cover border border-[var(--border)]"
                  />
                  <span className="text-xs font-bold text-[var(--text)]">
                    {selectedCourseForPayment.channelInfo.channelName}
                  </span>
                </div>
                <span className="text-base font-extrabold text-[#FF6B1A]">
                  ₹{selectedCourseForPayment.priceInr.toLocaleString()}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[var(--text)] line-clamp-1">
                {selectedCourseForPayment.title}
              </h4>
              <p className="text-[11px] text-[var(--muted)]">
                Coach: {selectedCourseForPayment.instructor.name} · Lifetime Access & Support
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] block">
                Choose Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / GPay', icon: Smartphone },
                  { id: 'card', label: 'Debit / Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'border-[#FF6B1A] bg-[#FF6B1A]/10 text-[#FF6B1A] font-bold'
                          : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI input if selected */}
              {paymentMethod === 'upi' && (
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. yourname@okaxis / gpay)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl text-xs text-[var(--text)] placeholder-[var(--muted)]/60 focus:outline-none focus:border-[#FF6B1A]"
                  />
                  <span className="text-[10px] text-[var(--muted)] block mt-1">
                    Fast checkout: Tap Pay below to simulate instant UPI approval.
                  </span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border)] text-xs space-y-1.5">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Course Price:</span>
                <span className="line-through">₹{selectedCourseForPayment.originalPriceInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Special Academy Discount:</span>
                <span>-₹{(selectedCourseForPayment.originalPriceInr - selectedCourseForPayment.priceInr).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>GST (18%):</span>
                <span className="text-emerald-500 font-bold">Waived (Promo)</span>
              </div>
              <div className="pt-2 border-t border-[var(--border)] flex justify-between font-bold text-sm text-[var(--text)]">
                <span>Total Amount to Pay:</span>
                <span className="text-lg text-[#FF6B1A]">
                  ₹{selectedCourseForPayment.priceInr.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={handleConfirmPayment}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B1A] via-[#FF7A29] to-[#FF8C3A] text-white font-bold text-sm shadow-lg shadow-[#FF6B1A]/25 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{selectedCourseForPayment.priceInr.toLocaleString()} & Start Instantly</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Payment Success Confirmation Popup */}
      {paymentSuccessCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[var(--surface)] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-5 text-[var(--text)] shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Payment Confirmed
              </span>
              <h3 className="text-xl font-extrabold text-[var(--text)] mt-1">
                You're Enrolled!
              </h3>
              <p className="text-xs text-[var(--muted)] mt-1">
                Lifetime access to <strong>{paymentSuccessCourse.title}</strong> has been unlocked in your account.
              </p>
            </div>

            {/* Coach WhatsApp Info Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Coach Direct WhatsApp Hotline
              </span>
              <p className="text-xs text-[var(--text)]">
                You can now message Coach {paymentSuccessCourse.instructor.name} on WhatsApp anytime for form checks and customized workout tweaks.
              </p>
              <a
                href={`https://wa.me/${paymentSuccessCourse.instructor.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
                  paymentSuccessCourse.instructor.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
              >
                <span>Send Welcome Message on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setPaymentSuccessCourse(null);
                setActiveTab('my_courses');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B1A] to-[#FF8833] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Go to My Enrolled Courses
            </button>
          </div>
        </div>
      )}

      {/* Interactive Lesson Player Modal Simulation */}
      {activeLessonPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[var(--text)] max-h-[90vh]">
            {/* Player Video Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center text-white">
              <button
                type="button"
                onClick={() => setActiveLessonPlayer(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FF6B1A] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#FF6B1A]/40 animate-pulse">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FFB547] tracking-wider block">
                    {activeLessonPlayer.moduleTitle}
                  </span>
                  <h4 className="text-lg font-bold mt-1 text-white">
                    {activeLessonPlayer.lessonTitle}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Interactive HD video player with downloadable chapter slides & exercise form checkpoints.
                </p>
              </div>
            </div>

            {/* Lesson notes & Coach Action */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div>
                  <h5 className="font-bold text-sm text-[var(--text)]">Key Takeaways from This Lesson</h5>
                  <p className="text-[11px] text-[var(--muted)]">Course: {activeLessonPlayer.course.title}</p>
                </div>
                <a
                  href={`https://wa.me/${activeLessonPlayer.course.instructor.whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask Coach on WhatsApp</span>
                </a>
              </div>

              <div className="space-y-2 text-[var(--text)]/90 leading-relaxed">
                <p>
                  • <strong>Movement Principle:</strong> Align joint trajectory before applying mechanical load.
                </p>
                <p>
                  • <strong>Breathing Rhythm:</strong> Exhale smoothly through the sticking point to avoid intra-thoracic blood pressure spikes.
                </p>
                <p>
                  • <strong>RPE Guideline:</strong> Keep 2 reps in reserve (RIR 2) during initial calibration sessions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('Lesson marked as completed! Progress saved.', 'success');
                  setActiveLessonPlayer(null);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Mark Lesson Complete & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';

// Looping animated SVG icons (CSS / SVG only, transform/opacity only)
const DrawerIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="overflow-visible">
    <rect x="6" y="8" width="32" height="28" rx="4" stroke="rgba(255,235,220,0.18)" strokeWidth="1.5" fill="#17110E" />
    <line x1="6" y1="20" x2="38" y2="20" stroke="rgba(255,235,220,0.12)" strokeWidth="1.2" />
    <g className="motion-safe:animate-[pulse_3s_ease-in-out_infinite]">
      <rect x="17" y="13" width="10" height="2.5" rx="1.25" fill="#FF6B1A" />
      <rect x="17" y="25" width="10" height="2.5" rx="1.25" fill="#FFB547" />
    </g>
    <circle cx="31" cy="26" r="1.5" fill="#FF6B1A" />
  </svg>
);

const ReadinessMeterIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M 9 32 A 15 15 0 0 1 35 32"
      stroke="#17110E"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M 9 32 A 15 15 0 0 1 35 32"
      stroke="#FF6B1A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="60"
      strokeDashoffset="15"
      opacity="0.8"
    />
    <g className="origin-[22px_32px] motion-safe:animate-[wiggle_4s_ease-in-out_infinite]" style={{ transformOrigin: '22px 32px' }}>
      <line x1="22" y1="32" x2="29" y2="18" stroke="#FFB547" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="32" r="3" fill="#FFF4EC" />
    </g>
  </svg>
);

const SkeletonLockIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <line x1="10" y1="28" x2="20" y2="16" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="16" x2="28" y2="24" stroke="#FFB547" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="28" r="3" fill="#FFF4EC" />
    <circle cx="20" cy="16" r="3.5" fill="#FF6B1A" />
    <circle cx="28" cy="24" r="3" fill="#FFF4EC" />
    <g className="motion-safe:animate-[pulse_4s_ease-in-out_infinite]">
      <rect x="26" y="10" width="12" height="10" rx="2" fill="#17110E" stroke="#FF6B1A" strokeWidth="1.5" />
      <path d="M 29 10 V 7 A 3 3 0 0 1 35 7 V 10" stroke="#FFB547" strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="15" r="1.5" fill="#FFF4EC" />
    </g>
  </svg>
);

const BowlFoodIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M 17 12 C 16 10, 18 8, 17 6"
      stroke="#FFB547"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
    />
    <path
      d="M 22 13 C 21 11, 23 9, 22 7"
      stroke="#FF6B1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="motion-safe:animate-[pulse_3s_ease-in-out_infinite_0.5s]"
    />
    <path
      d="M 27 12 C 26 10, 28 8, 27 6"
      stroke="#FFB547"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="motion-safe:animate-[pulse_3s_ease-in-out_infinite_1s]"
    />
    <path
      d="M 8 18 H 36 C 36 29, 29 33, 22 33 C 15 33, 8 29, 8 18 Z"
      fill="#17110E"
      stroke="#FF6B1A"
      strokeWidth="1.5"
    />
    <line x1="16" y1="33" x2="28" y2="33" stroke="rgba(255,235,220,0.3)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ReasonCards: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section
      id="why-different"
      className={`py-16 md:py-24 bg-[var(--bg)] border-t border-[var(--border)] relative z-10 ${className}`}
      aria-label="Why Fitness Intelligence is different"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B1A]">
            Core architecture
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text)] tracking-tight mt-1">
            Built differently from conventional fitness apps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-2">
            Every recommendation is rooted in verifiable physiological formulas, on-device pose telemetry, and transparent rules.
          </p>
        </div>

        {/* Asymmetric Layout: Focal Hero Card on Left, Quiet Divider Rows on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Focal Block: Explainable by design */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <DrawerIcon />
                </div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#FFB547] bg-[#FFB547]/10 px-2.5 py-1 rounded border border-[#FFB547]/25">
                  Transparency
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight mb-3">
                Explainable by design
              </h3>

              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                Inspect the exact mathematical formulas, input variables, and physiological rules behind every calorie target, rest interval, and movement substitution. No black boxes.
              </p>
            </div>

            {/* Formula Inspector Preview */}
            <div className="pt-5 border-t border-[var(--border)] space-y-2">
              <span className="text-[11px] font-mono uppercase text-[var(--muted)] block">
                Sample engine formula (Mifflin-St Jeor + Autoregulation)
              </span>
              <div className="p-3 rounded-xl bg-[var(--surface-2)] font-mono text-xs text-zinc-300 space-y-1">
                <p className="text-[#FFB547]">Target Calories = TDEE + Goal Delta</p>
                <p className="text-[var(--muted)] text-[11px]">
                  Daily Volume = Planned Sets × (Readiness Score &lt; 50 ? 0.70 : 1.0)
                </p>
              </div>
            </div>
          </div>

          {/* Quiet Column: Rows separated by thin dividers instead of repetitive boxes */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 divide-y divide-[var(--border)]">
            {/* Row 1: Autoregulation */}
            <div className="pb-5 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] shrink-0 mt-1">
                <ReadinessMeterIcon />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[var(--text)]">
                    Autoregulation from daily check-ins
                  </h4>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  A 3-tap morning check-in scales session volume down by 30% when systemic fatigue or joint soreness is logged.
                </p>
              </div>
            </div>

            {/* Row 2: Privacy & On-Device Vision */}
            <div className="py-5 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] shrink-0 mt-1">
                <SkeletonLockIcon />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[var(--text)]">
                    On-device vision analysis
                  </h4>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Real-time rep counting and joint angles are computed locally in your browser using MediaPipe. Video frames never leave your hardware.
                </p>
              </div>
            </div>

            {/* Row 3: Nutrition Calibration */}
            <div className="pt-5 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] shrink-0 mt-1">
                <BowlFoodIcon />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[var(--text)]">
                    Portion estimates calibrated for real plates
                  </h4>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Nutritional calculations are anchored directly to USDA reference densities per 100g, supporting both Indian staples and international meals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

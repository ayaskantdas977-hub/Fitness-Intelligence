import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  Activity,
  Sliders,
  Sparkles,
  ShieldCheck,
  Headphones,
  ChevronRight,
  Award,
  Compass,
  Languages,
  Search,
  Dumbbell,
  Filter,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { VoiceCoachHUD } from '../components/audio/VoiceCoachHUD';
import { voiceCoach, BIOMECHANICAL_GUIDES } from '../services/voiceCoachService';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import exercisesSeed from '../mocks/exercises.json';

export const VoiceCoachPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [exerciseSearch, setExerciseSearch] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [visibleLimit, setVisibleLimit] = useState<number>(12);

  const sampleCues = [
    {
      category: 'Squats',
      issue: 'knee_valgus',
      title: 'Knee Valgus (Inward Cave)',
      description: 'Triggers when knees collapse medially past 8 degrees.',
      play: () => voiceCoach.announceCorrection('knee_valgus'),
    },
    {
      category: 'Squats',
      issue: 'depth_incomplete',
      title: 'Sub-Parallel Depth',
      description: 'Triggers when hip crease fails to break 90° parallel.',
      play: () => voiceCoach.announceCorrection('depth_incomplete'),
    },
    {
      category: 'Deadlifts & Squats',
      issue: 'lumbar_flexion',
      title: 'Lumbar Spine Rounding',
      description: 'Protects discs by enforcing rigid intra-abdominal pressure.',
      play: () => voiceCoach.announceCorrection('lumbar_flexion'),
    },
    {
      category: 'Push-Ups & Press',
      issue: 'elbow_flare',
      title: 'Shoulder Elbow Flare',
      description: 'Prevents subacromial impingement by tucking elbows to 45°.',
      play: () => voiceCoach.announceCorrection('elbow_flare'),
    },
    {
      category: 'Planks & Push-Ups',
      issue: 'hip_sag',
      title: 'Anterior Pelvic Tilt / Sag',
      description: 'Enforces rigid core plank and glute contraction.',
      play: () => voiceCoach.announceCorrection('hip_sag'),
    },
    {
      category: 'Milestone',
      issue: 'rep_10',
      title: 'Rep 10 Milestone',
      description: 'Dynamic set completion celebration chime and audio cheer.',
      play: () => voiceCoach.announceRep(10),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FF6B1A]/10 via-[#FF8833]/5 to-transparent border border-[#FF6B1A]/20 overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B1A]/10 text-xs font-bold text-[#FF6B1A] mb-3 border border-[#FF6B1A]/20">
            <Headphones className="w-3.5 h-3.5" />
            <span>HANDS-FREE GYM AUDIO COMPANION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-light text-[var(--text)] tracking-tight">
            AI Voice Coach & Audio Studio
          </h1>
          <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
            When you're training under heavy load, you can't keep staring at a screen. Our client-side Web Speech & Web Audio engine announces real-time joint corrections, rep counts, and cadence metronomes straight into your headphones.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => navigate('/form-checker')}
              className="px-4 py-2 rounded-xl bg-[#FF6B1A] hover:bg-[#FF8833] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF6B1A]/25 flex items-center gap-1.5"
            >
              <span>Launch with Form Checker</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% In-Browser • Zero Audio Data Sent to Cloud</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#FF6B1A]/15 to-transparent pointer-events-none blur-2xl" />
      </div>

      {/* Main Studio Interactive HUD */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text)] mb-3 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FF6B1A]" />
          <span>Live Audio Controls & Metronome</span>
        </h2>
        <VoiceCoachHUD />
      </div>

      {/* Explainative Biomechanical Angle & Setup Guide (Tamil, Odia, Hindi & English) */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[11px] font-bold text-[#FF6B1A] border border-[#FF6B1A]/20 mb-1">
              <Languages className="w-3 h-3" />
              <span>MULTILINGUAL BIOMECHANICS • தமிழ் • ଓଡ଼ିଆ • HINDI • ENGLISH</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#FF6B1A]" />
              <span>Biomechanical Setup & Joint Angles Guide</span>
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Detailed explainative angle cues for leg press (45°), squats (parallel 90°), elbows, and spine — with native Tamil (தமிழ்), Odia (ଓଡ଼ିଆ), Hindi, and English voice synthesis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BIOMECHANICAL_GUIDES.map((guide) => (
            <Card
              key={guide.id}
              className="p-5 border border-white/10 bg-[var(--surface)] hover:border-[#FF6B1A]/40 transition-all rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] border border-[#FF6B1A]/20">
                    {guide.exercise}
                  </span>
                  <span className="text-[10px] text-[var(--muted)] font-mono">
                    {guide.targetPart}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--text)] mb-2">
                  {guide.name}
                </h3>

                {/* Key Angle & Depth Rule Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block">Key Angle</span>
                    <span className="text-xs font-bold text-[#FF6B1A]">{guide.keyAngle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block">Depth / Safety</span>
                    <span className="text-xs font-medium text-[var(--text)]">{guide.depthRule}</span>
                  </div>
                </div>

                {/* Multilingual Explanations */}
                <div className="space-y-2.5 text-xs text-[var(--muted)] leading-relaxed">
                  {/* Tamil Section */}
                  <div className="p-2.5 rounded-xl bg-blue-500/[0.05] border border-blue-500/20">
                    <span className="text-[10px] font-bold text-blue-400 block mb-1">
                      தமிழில் அறிவுறுத்தல்கள் (Tamil):
                    </span>
                    <p className="text-[var(--text)] text-xs font-medium mb-1">
                      {guide.tamil.script}
                    </p>
                    <p className="text-[11px] text-[var(--muted)] italic">
                      Pronunciation: "{guide.tamil.phonetic}"
                    </p>
                  </div>

                  {/* Odia Section */}
                  <div className="p-2.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
                    <span className="text-[10px] font-bold text-amber-400 block mb-1">
                      ଓଡ଼ିଆରେ ନିର୍ଦ୍ଦେଶ (Odia):
                    </span>
                    <p className="text-[var(--text)] text-xs font-medium mb-1">
                      {guide.odia.script}
                    </p>
                    <p className="text-[11px] text-[var(--muted)] italic">
                      Pronunciation: "{guide.odia.phonetic}"
                    </p>
                  </div>

                  {/* Hindi Section */}
                  <div className="p-2.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                    <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">
                      हिंदी में निर्देश (Hindi):
                    </span>
                    <p className="text-[var(--text)] text-xs">
                      {guide.hindi.script}
                    </p>
                  </div>

                  {/* English Section */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-bold text-[var(--muted)] block mb-0.5">
                      English Biomechanics:
                    </span>
                    <p className="text-[11px] text-[var(--muted)]">
                      {guide.english}
                    </p>
                  </div>
                </div>
              </div>

              {/* Multilingual Voice Triggers */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    voiceCoach.speakBiomechanicalGuide(guide.id, 'ta');
                    showToast(`தமிழில் அறிவுறுத்தல் (${guide.name})`, 'info');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-blue-500/20"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>கேளுங்கள் (Tamil)</span>
                </button>

                <button
                  onClick={() => {
                    voiceCoach.speakBiomechanicalGuide(guide.id, 'or');
                    showToast(`ଓଡ଼ିଆରେ ନିର୍ଦ୍ଦେଶ କୁହାଯାଉଛି (${guide.name})`, 'info');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-amber-500/20"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ଶୁଣନ୍ତୁ (Odia)</span>
                </button>

                <button
                  onClick={() => {
                    voiceCoach.speakBiomechanicalGuide(guide.id, 'hi');
                    showToast(`हिंदी में निर्देश सुनाया जा रहा है (${guide.name})`, 'info');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-emerald-500/20"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>सुने (Hindi)</span>
                </button>

                <button
                  onClick={() => {
                    voiceCoach.speakBiomechanicalGuide(guide.id, 'en');
                    showToast(`Playing English cue (${guide.name})`, 'info');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-[#FF6B1A]/10 hover:bg-[#FF6B1A]/20 text-[#FF6B1A] text-xs font-bold transition-all flex items-center justify-center gap-1 border border-[#FF6B1A]/20"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen (EN)</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Complete Exercise Audio Library & Biomechanics Search (All 60 Exercises) */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[11px] font-bold text-[#FF6B1A] border border-[#FF6B1A]/20 mb-1">
              <Dumbbell className="w-3 h-3" />
              <span>ALL 60 GYM EXERCISES • MULTILINGUAL AUDIO LIBRARY</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#FF6B1A]" />
              <span>Search All Exercises & Audition Voice Cues</span>
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Browse any movement across legs, chest, back, shoulders, arms, and core. Listen to real-time voice cues in Tamil (தமிழ்), Odia (ଓଡ଼ିଆ), Hindi, and English.
            </p>
          </div>
          <div className="text-xs text-[var(--muted)] px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Voice: {voiceCoach.getLanguageOption(voiceCoach.getSettings().language).flag} {voiceCoach.getLanguageOption(voiceCoach.getSettings().language).name} ({voiceCoach.getLanguageOption(voiceCoach.getSettings().language).nativeName})</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-white/10 mb-4 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search exercises by name, muscle, equipment, or cue (e.g. Leg Press, Squat, Bench, Lat Pulldown, Curl)..."
              value={exerciseSearch}
              onChange={(e) => setExerciseSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[#FF6B1A]"
            />
            {exerciseSearch && (
              <button
                type="button"
                onClick={() => setExerciseSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Muscle Group Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#FF6B1A]" /> Muscle:
            </span>
            {[
              { id: 'all', label: 'All Muscles' },
              { id: 'legs', label: 'Legs' },
              { id: 'chest', label: 'Chest' },
              { id: 'back', label: 'Back' },
              { id: 'shoulders', label: 'Shoulders' },
              { id: 'arms', label: 'Arms' },
              { id: 'core', label: 'Core' },
              { id: 'full_body', label: 'Full Body' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMuscle(m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedMuscle === m.id
                    ? 'bg-[#FF6B1A] text-white font-bold shadow-md shadow-[#FF6B1A]/25'
                    : 'bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-[var(--text)] border border-white/5'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Equipment Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mr-1">
              Equipment:
            </span>
            {[
              { id: 'all', label: 'All Equipment' },
              { id: 'barbell', label: 'Barbell' },
              { id: 'dumbbell', label: 'Dumbbell' },
              { id: 'machine', label: 'Machine' },
              { id: 'cable', label: 'Cable' },
              { id: 'bodyweight', label: 'Bodyweight' },
            ].map((eq) => (
              <button
                key={eq.id}
                type="button"
                onClick={() => setSelectedEquipment(eq.id)}
                className={`px-2 py-0.5 rounded-md text-[11px] transition-all ${
                  selectedEquipment === eq.id
                    ? 'bg-white/20 text-white font-bold border border-white/30'
                    : 'bg-white/[0.03] hover:bg-white/10 text-[var(--muted)] border border-white/5'
                }`}
              >
                {eq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Exercise Grid */}
        {(() => {
          const filtered = exercisesSeed.filter((ex) => {
            const q = exerciseSearch.toLowerCase().trim();
            const matchesSearch =
              !q ||
              ex.name.toLowerCase().includes(q) ||
              ex.shortCueText.toLowerCase().includes(q) ||
              ex.muscleGroup.toLowerCase().includes(q) ||
              ex.equipment.toLowerCase().includes(q);
            const matchesMuscle = selectedMuscle === 'all' || ex.muscleGroup === selectedMuscle;
            const matchesEquip = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
            return matchesSearch && matchesMuscle && matchesEquip;
          });

          const displayList = exerciseSearch ? filtered : filtered.slice(0, visibleLimit);

          return (
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-3">
                <span>
                  Showing <strong className="text-[#FF6B1A]">{displayList.length}</strong> of {filtered.length} exercises
                  {exerciseSearch && ` matching "${exerciseSearch}"`}
                </span>
                {!exerciseSearch && filtered.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setVisibleLimit(visibleLimit >= filtered.length ? 12 : filtered.length)}
                    className="text-xs text-[#FF6B1A] hover:underline font-bold"
                  >
                    {visibleLimit >= filtered.length ? 'Show Less' : `Show All (${filtered.length})`}
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Dumbbell className="w-8 h-8 text-[var(--muted)] mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium text-[var(--text)]">No exercises found</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Try clearing your search query or filter tags.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setExerciseSearch('');
                      setSelectedMuscle('all');
                      setSelectedEquipment('all');
                    }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#FF6B1A] text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayList.map((ex) => (
                    <Card
                      key={ex.id}
                      className="p-4 border border-white/10 bg-[var(--surface)] hover:border-[#FF6B1A]/40 transition-all rounded-2xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] border border-[#FF6B1A]/20">
                            {ex.muscleGroup.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-[var(--muted)] capitalize font-mono px-2 py-0.5 rounded bg-white/5">
                            {ex.equipment}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-[var(--text)] mb-1">
                          {ex.name}
                        </h3>

                        <p className="text-xs text-[var(--muted)] leading-relaxed italic mb-3">
                          "{ex.shortCueText}"
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        {/* Primary Button (Active Voice) */}
                        <button
                          type="button"
                          onClick={() => {
                            voiceCoach.speakExerciseVoiceCue(ex);
                            const lang = voiceCoach.getLanguageOption(voiceCoach.getSettings().language);
                            showToast(`Auditioning ${ex.name} (${lang.name})`, 'info');
                          }}
                          className="w-full py-1.5 px-2 rounded-xl bg-[#FF6B1A]/10 hover:bg-[#FF6B1A] text-[#FF6B1A] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#FF6B1A]/20"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Audition ({voiceCoach.getLanguageOption(voiceCoach.getSettings().language).nativeName})</span>
                        </button>

                        {/* Quick Language Chips (Tamil, Odia, Hindi, English) */}
                        <div className="grid grid-cols-4 gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              voiceCoach.speakExerciseVoiceCue(ex, 'ta');
                              showToast(`தமிழில் அறிவுறுத்தல்: ${ex.name}`, 'info');
                            }}
                            className="py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/20 text-center truncate"
                            title="Tamil Voice Cue"
                          >
                            தமிழ்
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              voiceCoach.speakExerciseVoiceCue(ex, 'or');
                              showToast(`ଓଡ଼ିଆରେ ନିର୍ଦ୍ଦେଶ: ${ex.name}`, 'info');
                            }}
                            className="py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/20 text-center truncate"
                            title="Odia Voice Cue"
                          >
                            ଓଡ଼ିଆ
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              voiceCoach.speakExerciseVoiceCue(ex, 'hi');
                              showToast(`हिंदी में निर्देश: ${ex.name}`, 'info');
                            }}
                            className="py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 text-center truncate"
                            title="Hindi Voice Cue"
                          >
                            हिंदी
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              voiceCoach.speakExerciseVoiceCue(ex, 'en');
                              showToast(`English cue: ${ex.name}`, 'info');
                            }}
                            className="py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text)] text-[10px] font-bold border border-white/10 text-center truncate"
                            title="English Voice Cue"
                          >
                            EN
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Interactive Soundboard / Cue Audition */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B1A]" />
              <span>Audition Real-Time In-Workout Cues</span>
            </h2>
            <p className="text-xs text-[var(--muted)]">
              Click any card below to preview short real-time verbal cues in your selected language.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sampleCues.map((cue, idx) => (
            <Card
              key={idx}
              className="p-4 border border-white/10 bg-[var(--surface)] hover:border-[#FF6B1A]/40 transition-all rounded-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[var(--muted)] border border-white/5">
                    {cue.category}
                  </span>
                  <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#FF6B1A]" /> Audition
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text)] group-hover:text-[#FF6B1A] transition-colors">
                  {cue.title}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {cue.description}
                </p>
              </div>

              <button
                onClick={() => {
                  cue.play();
                  showToast(`Playing cue: ${cue.title}`, 'info');
                }}
                className="mt-4 w-full py-2 rounded-xl bg-white/5 hover:bg-[#FF6B1A] text-[var(--text)] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Verbal Cue</span>
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <Card className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="w-8 h-8 rounded-xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center mb-3">
            <Mic className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[var(--text)]">Hands-Free Speech Input</h4>
          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
            Step back 3 meters from your laptop or phone. Say "Start" or "Count" without walking over to touch your screen.
          </p>
        </Card>

        <Card className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="w-8 h-8 rounded-xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center mb-3">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[var(--text)]">Biomechanical Metronome</h4>
          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
            Synthesized Web Audio clicks pace your eccentric descent, pause, and concentric ascent (e.g. 3-1-1 tempo).
          </p>
        </Card>

        <Card className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="w-8 h-8 rounded-xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center mb-3">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[var(--text)]">Dual-Tone Chimes</h4>
          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
            Clean harmonic synthesized chords confirm completed repetitions and alert on form breakdown with zero latency.
          </p>
        </Card>
      </div>
    </div>
  );
};

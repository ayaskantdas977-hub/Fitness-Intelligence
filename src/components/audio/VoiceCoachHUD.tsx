import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Play,
  Square,
  Sparkles,
  Zap,
  Activity,
  Radio,
  Sliders,
  CheckCircle2,
  Languages,
  Search,
} from 'lucide-react';
import { Card } from '../ui/Card';
import {
  voiceCoach,
  SUPPORTED_LANGUAGES,
  type VoicePersona,
  type VoiceLanguage,
  type VoiceCoachSettings,
} from '../../services/voiceCoachService';
import { useToast } from '../../context/ToastContext';

interface VoiceCoachHUDProps {
  onClose?: () => void;
}

export const VoiceCoachHUD: React.FC<VoiceCoachHUDProps> = ({ onClose }) => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<VoiceCoachSettings>(voiceCoach.getSettings());
  const [languageSearch, setLanguageSearch] = useState<string>('');
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [metronomePhase, setMetronomePhase] = useState<'down' | 'pause' | 'up' | 'idle'>('idle');
  const [metronomeCount, setMetronomeCount] = useState<number>(1);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [selectedTempo, setSelectedTempo] = useState<'3-1-1' | '2-0-1' | '4-2-1'>('3-1-1');

  useEffect(() => {
    return () => {
      voiceCoach.stopMetronome();
      voiceCoach.stopSpeechRecognition();
    };
  }, []);

  const handleToggleEnable = () => {
    const next = !settings.enabled;
    const updated = { ...settings, enabled: next };
    setSettings(updated);
    voiceCoach.saveSettings({ enabled: next });
    if (next) {
      voiceCoach.speak('Voice coach activated. Stand by for real-time biomechanical cues.', true);
      showToast('Voice Coach activated!', 'success');
    } else {
      voiceCoach.stopMetronome();
      setIsMetronomeActive(false);
      showToast('Voice Coach muted', 'info');
    }
  };

  const handleSelectPersona = (persona: VoicePersona) => {
    const updated = { ...settings, persona };
    setSettings(updated);
    voiceCoach.saveSettings({ persona });
    const preview =
      persona === 'clinical'
        ? 'Clinical Biomechanist mode active. Joint alignment and lumbar neutrality prioritized.'
        : persona === 'high_energy'
        ? 'High Energy Coach ready! Let’s crush this set together!'
        : 'Minimalist mode. Ready.';
    voiceCoach.speak(preview, true);
  };

  const handleSelectLanguage = (language: VoiceLanguage) => {
    const updated = { ...settings, language };
    setSettings(updated);
    voiceCoach.saveSettings({ language });
    const langOpt = voiceCoach.getLanguageOption(language);
    voiceCoach.speak(langOpt.welcomeMessage, true, language);
    showToast(`${langOpt.name} (${langOpt.nativeName}) Activated!`, 'success');
  };

  const handleTestVoice = () => {
    voiceCoach.speakLegPressGuide(settings.language);
    const langOpt = voiceCoach.getLanguageOption(settings.language);
    showToast(`Leg Press 45° cue spoken in ${langOpt.name}`, 'info');
  };

  const toggleMetronome = () => {
    if (isMetronomeActive) {
      voiceCoach.stopMetronome();
      setIsMetronomeActive(false);
      setMetronomePhase('idle');
    } else {
      let down = 3,
        pause = 1,
        up = 1;
      if (selectedTempo === '2-0-1') {
        down = 2;
        pause = 0;
        up = 1;
      } else if (selectedTempo === '4-2-1') {
        down = 4;
        pause = 2;
        up = 1;
      }

      voiceCoach.startMetronome(
        { downSeconds: down, pauseSeconds: pause, upSeconds: up },
        (phase, count) => {
          setMetronomePhase(phase);
          setMetronomeCount(count);
        }
      );
      setIsMetronomeActive(true);
      showToast(`Tempo Metronome started (${selectedTempo})`, 'info');
    }
  };

  const toggleMicListening = () => {
    if (isListeningMic) {
      voiceCoach.stopSpeechRecognition();
      setIsListeningMic(false);
      showToast('Voice command listening disabled', 'info');
    } else {
      const started = voiceCoach.startSpeechRecognition((command) => {
        showToast(`Heard voice command: "${command}"`, 'info');
        if (command === 'count') {
          voiceCoach.speak('You have completed your target reps.', true);
        } else if (command === 'toggle_mute') {
          handleToggleEnable();
        }
      });
      if (started) {
        setIsListeningMic(true);
        showToast('Listening for hands-free commands ("Start", "Stop", "Count", "Reset")', 'success');
      } else {
        showToast('Speech recognition not supported in this browser.', 'warning');
      }
    }
  };

  return (
    <Card className="p-5 border border-white/10 bg-[var(--surface)] shadow-2xl rounded-2xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              settings.enabled
                ? 'bg-gradient-to-tr from-[#FF6B1A] to-[#FF8833] text-white shadow-lg shadow-[#FF6B1A]/20'
                : 'bg-white/5 text-[var(--muted)]'
            }`}
          >
            {settings.enabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[var(--text)] tracking-tight">AI Voice Coach</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] border border-[#FF6B1A]/20">
                Audio HUD
              </span>
            </div>
            <p className="text-xs text-[var(--muted)]">Hands-free real-time biomechanical voice cues</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleEnable}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              settings.enabled
                ? 'bg-[#FF6B1A] text-white shadow-md shadow-[#FF6B1A]/30'
                : 'bg-white/10 hover:bg-white/15 text-[var(--text)]'
            }`}
          >
            {settings.enabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" /> Active
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" /> Muted
              </>
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-[var(--muted)] hover:text-[var(--text)] text-sm px-2 py-1 rounded"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Searchable Multi-Language Selection */}
      <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[#FF6B1A]" />
            <span>Voice Language / ଭାଷା / மொழி / भाषा</span>
          </label>
          <span className="text-[10px] text-[#FF6B1A] font-bold px-2 py-0.5 rounded bg-[#FF6B1A]/10 border border-[#FF6B1A]/20">
            {voiceCoach.getLanguageOption(settings.language).name} (
            {voiceCoach.getLanguageOption(settings.language).nativeName})
          </span>
        </div>

        {/* Quick Language Selection Pills */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {[
            { code: 'ta', label: '🇮🇳 தமிழ் (Tamil)' },
            { code: 'or', label: '🇮🇳 ଓଡ଼ିଆ (Odia)' },
            { code: 'hi', label: '🇮🇳 हिंदी (Hindi)' },
            { code: 'en', label: '🌐 English' },
            { code: 'te', label: '🇮🇳 తెలుగు (Telugu)' },
            { code: 'bn', label: '🇮🇳 বাংলা (Bengali)' },
            { code: 'kn', label: '🇮🇳 ಕನ್ನಡ (Kannada)' },
            { code: 'ml', label: '🇮🇳 മലയാളം (Malayalam)' },
          ].map((quick) => (
            <button
              key={quick.code}
              type="button"
              onClick={() => {
                handleSelectLanguage(quick.code as VoiceLanguage);
                setLanguageSearch('');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                settings.language === quick.code
                  ? 'bg-[#FF6B1A] text-white font-bold shadow-md shadow-[#FF6B1A]/30'
                  : 'bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-[var(--text)] border border-white/5'
              }`}
            >
              {quick.label}
            </button>
          ))}
        </div>

        {/* Language Search Input */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search language by name or script (e.g. Tamil, தமிழ், Odia, Hindi)..."
            value={languageSearch}
            onChange={(e) => setLanguageSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-[var(--text)] focus:outline-none focus:border-[#FF6B1A]"
          />
          {languageSearch && (
            <button
              type="button"
              onClick={() => setLanguageSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Match info if searching */}
        {languageSearch && (
          <div className="text-[11px] text-[var(--muted)] mb-2 flex items-center justify-between">
            <span>
              Matching "{languageSearch}":{' '}
              <strong className="text-[#FF6B1A]">
                {
                  SUPPORTED_LANGUAGES.filter(
                    (l) =>
                      l.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                      l.nativeName.toLowerCase().includes(languageSearch.toLowerCase()) ||
                      l.region.toLowerCase().includes(languageSearch.toLowerCase()) ||
                      l.code.toLowerCase().includes(languageSearch.toLowerCase())
                  ).length
                }
              </strong>{' '}
              languages available
            </span>
          </div>
        )}

        {/* Filtered Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-40 overflow-y-auto pr-1">
          {SUPPORTED_LANGUAGES.filter(
            (l) =>
              l.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
              l.nativeName.toLowerCase().includes(languageSearch.toLowerCase()) ||
              l.region.toLowerCase().includes(languageSearch.toLowerCase()) ||
              l.code.toLowerCase().includes(languageSearch.toLowerCase())
          ).map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`p-1.5 rounded-lg border text-left transition-all text-xs flex flex-col justify-between ${
                settings.language === lang.code
                  ? 'bg-[#FF6B1A]/20 border-[#FF6B1A] text-white font-bold ring-1 ring-[#FF6B1A]'
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/10 text-[var(--muted)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold truncate">
                  {lang.flag} {lang.name}
                </span>
                {settings.language === lang.code && (
                  <CheckCircle2 className="w-3 h-3 text-[#FF6B1A]" />
                )}
              </div>
              <span className="text-[10px] opacity-75 truncate">{lang.nativeName}</span>
              <span className="text-[9px] opacity-50 truncate">{lang.region}</span>
            </button>
          ))}
        </div>

        {/* Active Language Live Preview Banner */}
        {(() => {
          const activeLang = voiceCoach.getLanguageOption(settings.language);
          return (
            <div className="mt-3 p-2.5 rounded-xl bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#FF6B1A] truncate">
                    Active: {activeLang.flag} {activeLang.name} ({activeLang.nativeName})
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[var(--muted)] shrink-0">
                    {activeLang.bcp47}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text)] italic truncate">
                  "{activeLang.welcomeMessage}"
                </p>
              </div>
              <button
                type="button"
                onClick={handleTestVoice}
                className="px-3 py-1.5 rounded-lg bg-[#FF6B1A] hover:bg-[#FF8833] text-white text-xs font-bold transition-all shadow shadow-[#FF6B1A]/30 flex items-center justify-center gap-1.5 shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Test 45° Cue</span>
              </button>
            </div>
          );
        })()}
      </div>

      {/* Persona Selection */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider block mb-2">
          Coaching Persona
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Clinical */}
          <button
            onClick={() => handleSelectPersona('clinical')}
            className={`p-3 rounded-xl border text-left transition-all ${
              settings.persona === 'clinical'
                ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[var(--text)] ring-1 ring-[#FF6B1A]'
                : 'border-white/5 bg-white/[0.02] hover:bg-white/5 text-[var(--muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-[var(--text)] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#FF6B1A]" /> Clinical
              </span>
              {settings.persona === 'clinical' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B1A]" />
              )}
            </div>
            <p className="text-[11px] leading-tight opacity-80">
              Joint angles, valgus angles, and spinal shear prevention.
            </p>
          </button>

          {/* High Energy */}
          <button
            onClick={() => handleSelectPersona('high_energy')}
            className={`p-3 rounded-xl border text-left transition-all ${
              settings.persona === 'high_energy'
                ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[var(--text)] ring-1 ring-[#FF6B1A]'
                : 'border-white/5 bg-white/[0.02] hover:bg-white/5 text-[var(--muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-[var(--text)] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#FF6B1A]" /> High Energy
              </span>
              {settings.persona === 'high_energy' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B1A]" />
              )}
            </div>
            <p className="text-[11px] leading-tight opacity-80">
              Pump-up rep milestones, intensity drive, and explosive pacing.
            </p>
          </button>

          {/* Minimalist */}
          <button
            onClick={() => handleSelectPersona('minimalist')}
            className={`p-3 rounded-xl border text-left transition-all ${
              settings.persona === 'minimalist'
                ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[var(--text)] ring-1 ring-[#FF6B1A]'
                : 'border-white/5 bg-white/[0.02] hover:bg-white/5 text-[var(--muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-[var(--text)] flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-[#FF6B1A]" /> Minimalist
              </span>
              {settings.persona === 'minimalist' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B1A]" />
              )}
            </div>
            <p className="text-[11px] leading-tight opacity-80">
              Concise rep counts and brief, single-word form cues.
            </p>
          </button>
        </div>
      </div>

      {/* Metronome & Rhythm Cadence */}
      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF6B1A]" />
            <span className="text-xs font-bold text-[var(--text)]">Biomechanical Tempo Metronome</span>
          </div>
          <div className="flex items-center gap-1">
            {(['3-1-1', '2-0-1', '4-2-1'] as const).map((tempo) => (
              <button
                key={tempo}
                onClick={() => setSelectedTempo(tempo)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  selectedTempo === tempo
                    ? 'bg-[#FF6B1A] text-white font-bold'
                    : 'bg-white/5 text-[var(--muted)] hover:bg-white/10'
                }`}
              >
                {tempo}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={toggleMetronome}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                isMetronomeActive
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-white/10 hover:bg-white/15 text-[var(--text)]'
              }`}
            >
              {isMetronomeActive ? (
                <>
                  <Square className="w-3 h-3 fill-current" /> Stop Cadence
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" /> Start Metronome
                </>
              )}
            </button>

            {/* Metronome Beat Indicator */}
            {isMetronomeActive && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded capitalize ${
                    metronomePhase === 'down'
                      ? 'bg-amber-500/20 text-amber-400'
                      : metronomePhase === 'pause'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {metronomePhase}: {metronomeCount}s
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A] animate-ping" />
              </div>
            )}
          </div>

          <button
            onClick={handleTestVoice}
            className="text-xs px-2.5 py-1 rounded-lg bg-[#FF6B1A]/10 hover:bg-[#FF6B1A]/20 text-[#FF6B1A] font-medium transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> Test Cue
          </button>
        </div>
      </div>

      {/* Hands-Free Voice Commands */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isListeningMic ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-[var(--muted)]'
            }`}
          >
            {isListeningMic ? <Mic className="w-3.5 h-3.5 animate-pulse" /> : <MicOff className="w-3.5 h-3.5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--text)] block">Hands-Free Mic Control</span>
            <span className="text-[10px] text-[var(--muted)]">
              {isListeningMic
                ? 'Listening for "Count", "Mute", "Reset"...'
                : 'Say "Start", "Count", or "Mute" hands-free'}
            </span>
          </div>
        </div>

        <button
          onClick={toggleMicListening}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
            isListeningMic
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/10 hover:bg-white/15 text-[var(--text)]'
          }`}
        >
          {isListeningMic ? 'Listening...' : 'Enable Mic'}
        </button>
      </div>
    </Card>
  );
};

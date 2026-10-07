import { describe, it, expect, beforeEach } from 'vitest';
import {
  voiceCoach,
  BIOMECHANICAL_GUIDES,
} from '../src/services/voiceCoachService';

class LocalStorageMock {
  private store: Record<string, string> = {};
  clear() {
    this.store = {};
  }
  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
}

if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = new LocalStorageMock();
}

describe('Voice Coach Service & Multilingual Biomechanics Engine', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
    voiceCoach.saveSettings({
      enabled: true,
      persona: 'high_energy',
      language: 'en',
      volume: 0.9,
      rate: 1.0,
      pitch: 1.0,
      soundEffectsEnabled: false, // mute audio context in tests
    });
  });

  it('loads valid initial settings and can update them', () => {
    const settings = voiceCoach.getSettings();
    expect(settings.enabled).toBe(true);
    expect(settings.persona).toBe('high_energy');
    expect(settings.language).toBe('en');

    voiceCoach.saveSettings({ persona: 'clinical', language: 'or', volume: 0.8 });
    const updated = voiceCoach.getSettings();
    expect(updated.persona).toBe('clinical');
    expect(updated.language).toBe('or');
    expect(updated.volume).toBe(0.8);
  });

  it('handles speak without crashing when speech synthesis is mocked or absent', () => {
    expect(() => {
      voiceCoach.speak('Test cue', true);
    }).not.toThrow();
  });

  it('manages rep announcements across personas and languages (Tamil, Odia, Hindi, English)', () => {
    (['en', 'ta', 'or', 'hi'] as const).forEach((lang) => {
      voiceCoach.saveSettings({ language: lang });
      expect(() => voiceCoach.announceRep(1)).not.toThrow();
      expect(() => voiceCoach.announceRep(5)).not.toThrow();
      expect(() => voiceCoach.announceRep(10)).not.toThrow();
    });
  });

  it('manages form correction cues across biomechanical flags in all languages including Tamil', () => {
    const flags = ['knee_valgus', 'depth_incomplete', 'lumbar_flexion', 'elbow_flare', 'hip_sag'];
    (['en', 'ta', 'or', 'hi'] as const).forEach((lang) => {
      voiceCoach.saveSettings({ language: lang });
      flags.forEach((flag) => {
        expect(() => voiceCoach.announceCorrection(flag)).not.toThrow();
      });
    });
  });

  it('validates comprehensive biomechanical guide cues data integrity including Tamil', () => {
    expect(BIOMECHANICAL_GUIDES.length).toBeGreaterThanOrEqual(6);

    // Verify Leg Press specific setup
    const legPressGuide = BIOMECHANICAL_GUIDES.find((g) => g.id === 'guide-leg-press');
    expect(legPressGuide).toBeDefined();
    expect(legPressGuide?.keyAngle).toContain('45°');
    expect(legPressGuide?.keyAngle).toContain('90°');
    expect(legPressGuide?.english).toContain('45-degree');
    expect(legPressGuide?.odia.script).toContain('୪୫ ଡିଗ୍ରୀ');
    expect(legPressGuide?.hindi.script).toContain('45 डिग्री');
    expect(legPressGuide?.tamil.script).toContain('45 டிகிரி');

    // Verify all guides have complete Tamil, Odia, Hindi, and English content
    BIOMECHANICAL_GUIDES.forEach((guide) => {
      expect(guide.name.trim().length).toBeGreaterThan(0);
      expect(guide.exercise.trim().length).toBeGreaterThan(0);
      expect(guide.keyAngle.trim().length).toBeGreaterThan(0);
      expect(guide.english.trim().length).toBeGreaterThan(15);
      expect(guide.odia.script.trim().length).toBeGreaterThan(15);
      expect(guide.odia.phonetic.trim().length).toBeGreaterThan(15);
      expect(guide.hindi.script.trim().length).toBeGreaterThan(15);
      expect(guide.tamil.script.trim().length).toBeGreaterThan(15);
      expect(guide.tamil.phonetic.trim().length).toBeGreaterThan(15);
    });
  });

  it('speaks explainative biomechanical guides in Tamil, Odia, Hindi, and English without throwing', () => {
    BIOMECHANICAL_GUIDES.forEach((guide) => {
      expect(() => voiceCoach.speakBiomechanicalGuide(guide.id, 'en')).not.toThrow();
      expect(() => voiceCoach.speakBiomechanicalGuide(guide.id, 'ta')).not.toThrow();
      expect(() => voiceCoach.speakBiomechanicalGuide(guide.id, 'or')).not.toThrow();
      expect(() => voiceCoach.speakBiomechanicalGuide(guide.id, 'hi')).not.toThrow();
    });
  });

  it('speaks exercise cues across exercise library in Tamil, Odia, Hindi, and English without throwing', () => {
    const sampleExercises = [
      { id: 'leg_press', name: '45° Leg Press', shortCueText: 'Feet shoulder-width on carriage' },
      { id: 'barbell_back_squat', name: 'Barbell Back Squat', shortCueText: 'Drive knees out, hit parallel' },
      { id: 'standard_push_up', name: 'Standard Push-Up', shortCueText: 'Lock elbows at 45 degrees' },
      { id: 'custom_ex', name: 'Custom Cable Row', shortCueText: 'Pull to sternum' },
    ];

    sampleExercises.forEach((ex) => {
      expect(() => voiceCoach.speakExerciseVoiceCue(ex, 'ta')).not.toThrow();
      expect(() => voiceCoach.speakExerciseVoiceCue(ex, 'or')).not.toThrow();
      expect(() => voiceCoach.speakExerciseVoiceCue(ex, 'hi')).not.toThrow();
      expect(() => voiceCoach.speakExerciseVoiceCue(ex, 'en')).not.toThrow();
    });
  });

  it('controls metronome lifecycle cleanly', () => {
    let tickCount = 0;
    voiceCoach.startMetronome({ downSeconds: 2, pauseSeconds: 1, upSeconds: 1 }, () => {
      tickCount++;
    });
    expect(tickCount).toBeGreaterThanOrEqual(1);
    expect(() => voiceCoach.stopMetronome()).not.toThrow();
  });
});

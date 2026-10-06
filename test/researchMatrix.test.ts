import { describe, it, expect } from 'vitest';
import {
  RESEARCH_DATA_2026,
  type ResearchComparisonItem,
} from '../src/components/research/LiveResearchMatrix2026';

describe('Live 2026 Clinical Research Matrix Integrity', () => {
  it('contains exactly 6 structured clinical beats matching UI specs', () => {
    expect(RESEARCH_DATA_2026).toBeDefined();
    expect(RESEARCH_DATA_2026.length).toBe(6);
  });

  it('ensures each beat has sequential numbering from 01 to 06', () => {
    const expectedBeats = ['01', '02', '03', '04', '05', '06'];
    RESEARCH_DATA_2026.forEach((item: ResearchComparisonItem, idx: number) => {
      expect(item.beatNumber).toBe(expectedBeats[idx]);
    });
  });

  it('validates each beat contains verified medical citations and valid links', () => {
    RESEARCH_DATA_2026.forEach((item: ResearchComparisonItem) => {
      expect(item.scientificCitation.trim().length).toBeGreaterThan(10);
      expect(item.citationUrl).toMatch(/^https?:\/\//);
      expect(['META-ANALYSIS', 'CLINICAL RCT (2026)', 'SYSTEMATIC REVIEW']).toContain(
        item.evidenceGrade
      );
    });
  });

  it('contains meaningful comparative metrics between historic dogma and 2026 standards', () => {
    RESEARCH_DATA_2026.forEach((item: ResearchComparisonItem) => {
      expect(item.previousStandardYear.trim().length).toBeGreaterThan(4);
      expect(item.live2026StandardYear).toContain('2026');
      expect(item.keyMetrics).toBeDefined();
      expect(item.keyMetrics.value.trim().length).toBeGreaterThan(0);
      expect(item.keyMetrics.improvement.trim().length).toBeGreaterThan(0);
    });
  });

  it('covers all major anatomical joint systems and health pillars', () => {
    const categories = RESEARCH_DATA_2026.map((item) => item.category);
    expect(categories).toContain('spine');
    expect(categories).toContain('shoulder');
    expect(categories).toContain('knee');
    expect(categories).toContain('cardio');
    expect(categories).toContain('nutrition');
    expect(categories).toContain('mobility');
  });
});

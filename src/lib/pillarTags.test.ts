import { describe, it, expect } from 'vitest';
import {
  getPillarTagLabel,
  isCanonicalPillarKey,
  getPillarOptions,
  CANONICAL_PILLAR_KEYS,
  PILLAR_TAG_LABELS,
} from './pillarTags';

describe('pillarTags', () => {
  describe('CANONICAL_PILLAR_KEYS', () => {
    it('includes all expected pillar keys', () => {
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-1');
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-2');
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-3');
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-4');
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-5');
      expect(CANONICAL_PILLAR_KEYS).toContain('pillar-6');
      expect(CANONICAL_PILLAR_KEYS).toContain('lovable');
      expect(CANONICAL_PILLAR_KEYS).toContain('how-to');
      expect(CANONICAL_PILLAR_KEYS).toContain('guides');
      expect(CANONICAL_PILLAR_KEYS).toContain('debug-diaries');
      expect(CANONICAL_PILLAR_KEYS).toContain('case-studies');
      expect(CANONICAL_PILLAR_KEYS).toContain('survival-notes');
      expect(CANONICAL_PILLAR_KEYS).toContain('frameworks');
    });

    it('has matching entries in PILLAR_TAG_LABELS', () => {
      CANONICAL_PILLAR_KEYS.forEach(key => {
        expect(PILLAR_TAG_LABELS[key]).toBeDefined();
        expect(typeof PILLAR_TAG_LABELS[key]).toBe('string');
      });
    });
  });

  describe('getPillarTagLabel', () => {
    it('returns correct label for pillar-1', () => {
      expect(getPillarTagLabel('pillar-1')).toBe('Getting Started');
    });

    it('returns correct label for pillar-2', () => {
      expect(getPillarTagLabel('pillar-2')).toBe('Marketing');
    });

    it('returns correct label for pillar-3', () => {
      expect(getPillarTagLabel('pillar-3')).toBe('SEO & Content');
    });

    it('returns correct label for lovable', () => {
      expect(getPillarTagLabel('lovable')).toBe('Lovable');
    });

    it('returns correct label for how-to', () => {
      expect(getPillarTagLabel('how-to')).toBe('How To');
    });

    it('returns "Article" for null', () => {
      expect(getPillarTagLabel(null)).toBe('Article');
    });

    it('returns "Article" for undefined', () => {
      expect(getPillarTagLabel(undefined)).toBe('Article');
    });

    it('returns formatted fallback for unknown key', () => {
      expect(getPillarTagLabel('unknown-category')).toBe('Unknown Category');
    });
  });

  describe('isCanonicalPillarKey', () => {
    it('returns true for valid canonical keys', () => {
      expect(isCanonicalPillarKey('pillar-1')).toBe(true);
      expect(isCanonicalPillarKey('lovable')).toBe(true);
      expect(isCanonicalPillarKey('debug-diaries')).toBe(true);
    });

    it('returns false for invalid keys', () => {
      expect(isCanonicalPillarKey('SEO & Content')).toBe(false);
      expect(isCanonicalPillarKey('random-string')).toBe(false);
      expect(isCanonicalPillarKey('')).toBe(false);
    });
  });

  describe('getPillarOptions', () => {
    it('returns array of options with value and label', () => {
      const options = getPillarOptions();
      expect(Array.isArray(options)).toBe(true);
      expect(options.length).toBe(CANONICAL_PILLAR_KEYS.length);
    });

    it('each option has correct structure', () => {
      const options = getPillarOptions();
      options.forEach(option => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
        expect(typeof option.value).toBe('string');
        expect(typeof option.label).toBe('string');
      });
    });

    it('includes pillar-1 with Getting Started label', () => {
      const options = getPillarOptions();
      const pillar1 = options.find(o => o.value === 'pillar-1');
      expect(pillar1).toBeDefined();
      expect(pillar1?.label).toBe('Getting Started');
    });

    it('includes lovable with Lovable label', () => {
      const options = getPillarOptions();
      const lovable = options.find(o => o.value === 'lovable');
      expect(lovable).toBeDefined();
      expect(lovable?.label).toBe('Lovable');
    });
  });
});

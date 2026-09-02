import { describe, expect, it } from 'vitest';
import { ALPHABET, pickRandomLetter } from './letters';

describe('ALPHABET', () => {
  it('contains 27 letters, A to Z plus Ñ', () => {
    expect(ALPHABET).toHaveLength(27);
    expect(ALPHABET).toContain('Ñ');
    expect(ALPHABET[0]).toBe('A');
    expect(ALPHABET[ALPHABET.length - 1]).toBe('Z');
  });

  it('has no duplicate letters', () => {
    expect(new Set(ALPHABET).size).toBe(ALPHABET.length);
  });
});

describe('pickRandomLetter', () => {
  it('always returns a letter from the alphabet', () => {
    for (let i = 0; i < 200; i += 1) {
      expect(ALPHABET).toContain(pickRandomLetter());
    }
  });

  it('produces more than one distinct value across many draws', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 200; i += 1) {
      seen.add(pickRandomLetter());
    }
    expect(seen.size).toBeGreaterThan(1);
  });
});

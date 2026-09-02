import { useCallback, useEffect, useRef, useState } from 'react';
import { ALPHABET, pickRandomLetter } from './letters';

export type RouletteStatus = 'idle' | 'spinning' | 'result';

export interface UseRouletteResult {
  /** Current lifecycle status of the roulette. */
  status: RouletteStatus;
  /** Letter currently displayed (shuffling letter while spinning, final letter on result). */
  letter: string | null;
  /** Starts (or restarts) a spin cycle. No-op while already spinning. */
  spin: () => void;
  /** Cancels the current cycle and returns to the initial state. */
  clear: () => void;
}

const SHUFFLE_INTERVAL_MS = 50;
const MIN_SPIN_DURATION_MS = 2000;
const MAX_SPIN_DURATION_MS = 3000;

function randomSpinDuration(): number {
  return MIN_SPIN_DURATION_MS + Math.random() * (MAX_SPIN_DURATION_MS - MIN_SPIN_DURATION_MS);
}

/**
 * Drives the letter roulette animation: shuffles through the alphabet at a
 * fast interval for a random duration between 2 and 3 seconds, then stops on
 * a single random letter (A-Z plus Ñ).
 */
export function useRoulette(): UseRouletteResult {
  const [status, setStatus] = useState<RouletteStatus>('idle');
  const [letter, setLetter] = useState<string | null>(null);
  const isSpinningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const clear = useCallback(() => {
    clearTimers();
    isSpinningRef.current = false;
    setLetter(null);
    setStatus('idle');
  }, [clearTimers]);

  const spin = useCallback(() => {
    if (isSpinningRef.current) {
      return;
    }
    isSpinningRef.current = true;
    setStatus('spinning');
    clearTimers();

    intervalRef.current = setInterval(() => {
      setLetter(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
    }, SHUFFLE_INTERVAL_MS);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isSpinningRef.current = false;
      setLetter(pickRandomLetter());
      setStatus('result');
    }, randomSpinDuration());
  }, [clearTimers]);

  return { status, letter, spin, clear };
}

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ALPHABET } from './letters';
import { useRoulette } from './useRoulette';

describe('useRoulette', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts idle with no letter', () => {
    const { result } = renderHook(() => useRoulette());
    expect(result.current.status).toBe('idle');
    expect(result.current.letter).toBeNull();
  });

  it('shuffles letters while spinning and settles on a valid one', () => {
    const { result } = renderHook(() => useRoulette());

    act(() => {
      result.current.spin();
    });
    expect(result.current.status).toBe('spinning');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.letter).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.status).toBe('result');
    expect(result.current.letter).not.toBeNull();
    expect(ALPHABET).toContain(result.current.letter);
  });

  it('ignores spin calls while already spinning', () => {
    const { result } = renderHook(() => useRoulette());

    act(() => {
      result.current.spin();
    });
    const firstStatus = result.current.status;

    act(() => {
      result.current.spin();
    });

    expect(result.current.status).toBe(firstStatus);
  });

  it('can restart a new cycle after reaching a result', () => {
    const { result } = renderHook(() => useRoulette());

    act(() => {
      result.current.spin();
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.status).toBe('result');

    act(() => {
      result.current.spin();
    });
    expect(result.current.status).toBe('spinning');
  });
});

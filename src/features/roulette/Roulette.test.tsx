import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Roulette } from './Roulette';

describe('Roulette component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the waiting screen with an empty letter block and the spin button', () => {
    render(<Roulette />);
    expect(screen.getByRole('button', { name: /girar ruleta/i })).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows a single letter and re-enables the button after spinning', () => {
    render(<Roulette />);
    const button = screen.getByRole('button', { name: /girar ruleta/i });

    fireEvent.click(button);
    expect(button).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(button).not.toBeDisabled();
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
  });
});

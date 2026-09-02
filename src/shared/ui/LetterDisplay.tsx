import './LetterDisplay.scss';

export interface LetterDisplayProps {
  letter: string | null;
}

/** Central orange block that renders the current roulette letter. */
export function LetterDisplay({ letter }: LetterDisplayProps) {
  return (
    <div className="letter-display" role="status" aria-live="polite">
      {letter && <span className="letter-display__letter">{letter}</span>}
    </div>
  );
}

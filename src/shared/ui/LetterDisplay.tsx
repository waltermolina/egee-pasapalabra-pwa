import './LetterDisplay.scss';

export interface LetterDisplayProps {
  letter: string | null;
  onClear?: () => void;
}

/** Central orange block that renders the current roulette letter. */
export function LetterDisplay({ letter, onClear }: LetterDisplayProps) {
  return (
    <div className="letter-display" role="status" aria-live="polite">
      {letter ? (
        <>
          <span className="letter-display__letter">{letter}</span>
          {onClear && (
            <button className="letter-display__clear" type="button" onClick={onClear}>
              LIMPIAR RULETA
            </button>
          )}
        </>
      ) : (
        <img className="letter-display__logo" src="/somos-egee.svg" alt="Somos EGEE" />
      )}
    </div>
  );
}

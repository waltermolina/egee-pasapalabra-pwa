import { Button } from '../../shared/ui/Button';
import { LetterDisplay } from '../../shared/ui/LetterDisplay';
import { useRoulette } from './useRoulette';
import './Roulette.scss';

/** Pasapalabra-style letter roulette: spins through A-Z + Ñ and stops on a random letter. */
export function Roulette() {
  const { status, letter, spin } = useRoulette();

  return (
    <div className="roulette">
      <LetterDisplay letter={letter} />
      <Button onClick={spin} disabled={status === 'spinning'}>
        GIRAR RULETA
      </Button>
    </div>
  );
}

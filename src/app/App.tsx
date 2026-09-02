import { Roulette } from '../features/roulette/Roulette';
import './App.scss';

/** Root layout of the app: a fullscreen white canvas hosting the roulette. */
export function App() {
  return (
    <main className="app">
      <Roulette />
    </main>
  );
}

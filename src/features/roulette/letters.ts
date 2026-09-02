/** Full Spanish alphabet used by the roulette, including the Ñ. */
export const ALPHABET: readonly string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

/** Returns a random letter from the alphabet using a uniform distribution. */
export function pickRandomLetter(): string {
  const index = Math.floor(Math.random() * ALPHABET.length);
  return ALPHABET[index];
}

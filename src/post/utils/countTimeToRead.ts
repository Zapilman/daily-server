export const countTimeToRead = (text: string) => {
  const LETTERS_PER_MIN = 1600;

  return Math.round(text.trim().length / LETTERS_PER_MIN) || 1;
};

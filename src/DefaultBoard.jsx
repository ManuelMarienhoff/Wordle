import wordBank from './wordleBank.txt';

export const defaultBoard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

/* Store words in a Set bc it's faster to read when trying to find if word exists/is correct */
export const generateWordSet = async () => {
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      /* make an array of the words that are separated by line breaks */
      const wordsArray = result.split('\n').map((word) => word.trim());
      wordSet = new Set(wordsArray);
    });
  return { wordSet };
};
/* esto puedo moverlo a app? */

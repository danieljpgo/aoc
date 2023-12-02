const input = await Bun.file("2023/01/input.txt").text();

const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const result = input
  .split("\n")
  .map((line) => {
    let first;
    let last;

    const firstDigit = line.split("").find((chr) => !isNaN(Number(chr)));
    const firstDigitIndex = firstDigit ? line.indexOf(firstDigit) : -1;

    const lastDigit = line.split("").findLast((chr) => !isNaN(Number(chr)));
    const lastDigitIndex = lastDigit ? line.lastIndexOf(lastDigit) : -1;

    const firstWord = words
      .map((word) => ({ index: line.indexOf(word), word }))
      .filter((value) => value.index !== -1)
      .reduce((prev, curr) => (prev.index < curr.index ? prev : curr), {
        index: Infinity,
        word: "-",
      });

    const lastWord = words
      .map((word) => ({ index: line.lastIndexOf(word), word }))
      .filter((value) => value.index !== -1)
      .reduce((prev, curr) => (prev.index > curr.index ? prev : curr), {
        index: -Infinity,
        word: "-",
      });

    if (
      firstWord.index === -1 ||
      (firstDigitIndex > -1 && firstDigitIndex <= firstWord.index)
    ) {
      first = firstDigit;
    }
    if (
      firstDigitIndex === -1 ||
      (firstWord.index > -1 && firstWord.index <= firstDigitIndex)
    ) {
      first = words.findIndex((digit) => digit === firstWord.word);
    }
    if (
      lastWord.index === -1 ||
      (lastDigitIndex > -1 && lastDigitIndex >= lastWord.index)
    ) {
      last = lastDigit;
    }
    if (
      lastDigitIndex === -1 ||
      (lastWord.index > -1 && lastWord.index >= lastDigitIndex)
    ) {
      last = words.findIndex((word) => word === lastWord.word);
    }

    return `${first}${last}`;
  })
  .map(Number)
  .reduce((prev, curr) => prev + curr);

console.log(result);

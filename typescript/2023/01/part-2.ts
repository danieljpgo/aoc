const input = await Bun.file("2023/01/input.txt").text();

const numbers = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const response = input
  .split("\n")
  .map((line) => {
    const firstDigit = Object.keys(numbers)
      .map((digit, i) => ({ index: line.indexOf(digit), value: i + 1 }))
      .filter((data) => data.index !== -1)
      .reduce((prev, curr) => (prev.index < curr.index ? prev : curr), {
        value: -1,
        index: Infinity,
      });

    const firstWord = Object.values(numbers)
      .map((digit, i) => ({ index: line.indexOf(digit), value: i + 1 }))
      .filter((data) => data.index !== -1)
      .reduce((prev, curr) => (prev.index < curr.index ? prev : curr), {
        value: -1,
        index: Infinity,
      });

    const lastDigit = Object.keys(numbers)
      .map((digit, i) => ({ index: line.lastIndexOf(digit), value: i + 1 }))
      .filter((data) => data.index !== -1)
      .reduce((prev, curr) => (prev.index > curr.index ? prev : curr), {
        value: -1,
        index: -Infinity,
      });

    const lastWord = Object.values(numbers)
      .map((digit, i) => ({ index: line.lastIndexOf(digit), value: i + 1 }))
      .filter((data) => data.index !== -1)
      .reduce((prev, curr) => (prev.index > curr.index ? prev : curr), {
        value: -1,
        index: -Infinity,
      });

    const first =
      firstDigit.index > firstWord.index ? firstWord.value : firstDigit.value;
    const last =
      lastDigit.index < lastWord.index ? lastWord.value : lastDigit.value;

    return `${first}${last}`;
  })
  .map(Number)
  .reduce((prev, curr) => prev + curr);

console.log(response);

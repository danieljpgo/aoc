const input = await Bun.file("2023/01/input.txt").text();

const response = input
  .split("\n")
  .map((line) => {
    const first = line.split("").find((chr) => !isNaN(Number(chr)));
    const last = line.split("").findLast((chr) => !isNaN(Number(chr)));
    return `${first}${last}`;
  })
  .map(Number)
  .reduce((prev, curr) => prev + curr);

console.log(response);

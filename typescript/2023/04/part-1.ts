const input = await Bun.file("2023/04/input.txt").text();

const response = input
  .split("\n")
  .map((line) => {
    const [id, numbers] = line.replaceAll("  ", " ").split(":");
    const [winning, haved] = numbers.split("|");
    return {
      id,
      winning: winning.trim().split(" "),
      haved: haved.trim().split(" "),
    };
  })
  .map((card) => {
    const matchs = card.winning.filter((value) =>
      card.haved.includes(value)
    ).length;

    return {
      ...card,
      points: matchs > 1 ? Math.pow(2, matchs - 1) : matchs,
    };
  })
  .reduce((prev, curr) => prev + curr.points, 0);

console.log(response);

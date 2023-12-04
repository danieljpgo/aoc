const input = await Bun.file("2023/02/input.txt").text();

const config = { red: 12, green: 13, blue: 14 };

const response = input
  .split("\n")
  .map((game) => {
    const [id, moves] = game.split(":");
    return {
      id: Number(id.split(" ")[1]),
      moves: moves
        .replaceAll(";", ",")
        .trim()
        .split(",")
        .map((value) => value.trim().split(" ")),
    };
  })
  .map((game) =>
    game.moves.every(([amount, color]) => amount <= config[color])
      ? game.id
      : null
  )
  .filter((id): id is number => Boolean(id))
  .reduce((prev, curr) => prev + curr);

console.log(response);

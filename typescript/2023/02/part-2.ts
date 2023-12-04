const input = await Bun.file("2023/02/input.txt").text();

type Color = "red" | "blue" | "green";

const response = input
  .split("\n")
  .map((game) => {
    const [id, moves] = game.split(":");
    return {
      id: Number(id.split(" ")[1]),
      cubes: moves
        .replaceAll(";", ",")
        .trim()
        .split(",")
        .map((value) => value.trim().split(" ") as [string, Color])
        .reduce(
          (prev, [amount, color]) => ({
            ...prev,
            [color]:
              prev[color] < Number(amount) ? Number(amount) : prev[color],
          }),
          { blue: 0, red: 0, green: 0 }
        ),
    };
  })
  .map((game) => Object.values(game.cubes).reduce((prev, curr) => prev * curr))
  .reduce((prev, curr) => prev + curr);

console.log(response);

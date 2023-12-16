const input = await Bun.file("2023/03/input.txt").text();

const numbers = new Set<string>();

input.split("\n").forEach((line, y, original) => {
  const symbols = line
    .split("")
    .map((chr, i) => (chr === "*" ? i : null))
    .filter((x): x is number => x !== null);

  symbols.forEach((x) => {
    const left = backtracking(line.substring(0, x), "left");
    const right = backtracking(line.substring(x + 1), "right");

    if (left) {
      numbers.add([y, x, left].join(";"));
    }
    if (right) {
      numbers.add([y, x, right].join(";"));
    }

    const prev = y - 1;
    const next = y + 1;

    if (original[prev]) {
      const top = !isNaN(Number(original[prev][x])) ? original[prev][x] : "";
      const topLeft = backtracking(original[prev].substring(0, x), "left");
      const topRight = backtracking(original[prev].substring(x + 1), "right");

      let find: Array<{ value: string; x: number }> = [];

      if (topLeft && top && topRight) {
        find.push({
          value: topLeft + top + topRight,
          x: x - topLeft.length,
        });
      } else if (topLeft && top) {
        find.push({ value: topLeft + top, x: x - topLeft.length });
      } else if (top && topRight) {
        find.push({ value: top + topRight, x });
      } else if (top) {
        find.push({ value: top, x });
      } else if (topLeft || topRight) {
        if (topLeft) {
          find.push({ value: topLeft, x: x - topLeft.length });
        }
        if (topRight) {
          find.push({ value: topRight, x: x + topRight.length });
        }
      }

      find.forEach((data) => {
        numbers.add([y, x, data.value].join(";"));
      });
    }

    if (original[next]) {
      const bottom = !isNaN(Number(original[next][x])) ? original[next][x] : "";
      const bottomLeft = backtracking(original[next].substring(0, x), "left");
      const bottomRight = backtracking(
        original[next].substring(x + 1),
        "right"
      );

      let find: Array<{ value: string; x: number }> = [];

      if (bottomLeft && bottom && bottomRight) {
        find.push({
          value: bottomLeft + bottom + bottomRight,
          x: x - bottomLeft.length,
        });
      } else if (bottomLeft && bottom) {
        find.push({ value: bottomLeft + bottom, x: x - bottomLeft.length });
      } else if (bottom && bottomRight) {
        find.push({ value: bottom + bottomRight, x });
      } else if (bottom) {
        find.push({ value: bottom, x });
      } else if (bottomLeft || bottomRight) {
        if (bottomLeft) {
          find.push({ value: bottomLeft, x: x - bottomLeft.length });
        }
        if (bottomRight) {
          find.push({ value: bottomRight, x: x + bottomRight.length });
        }
      }

      find.forEach((data) => {
        numbers.add([y, x, data.value].join(";"));
      });
    }
  });
});

function backtracking(text: string, direction: "left" | "right"): string {
  const curr = direction === "left" ? text.at(-1) : text.at(0);

  if (!text || isNaN(Number(curr))) {
    return "";
  }
  if (direction === "left") {
    return backtracking(text.substring(0, text.length - 1), direction) + curr;
  }
  return curr + backtracking(text.substring(1, text.length), direction);
}

const data = [...numbers].reduce((prev, curr) => {
  const [y, x, value] = curr.split(";");
  return {
    ...prev,
    [`${y}-${x}`]: [...(prev?.[`${y}-${x}`] ?? []), Number(value)],
  };
}, {} as Record<string, Array<number>>);

const response = Object.values(data)
  .filter((d) => d.length === 2)
  .reduce((prev, [first, second]) => prev + first * second, 0);

console.log(response);

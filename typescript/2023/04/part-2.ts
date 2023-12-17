const input = await Bun.file("2023/04/input.txt").text();

const response = input
  .split("\n")
  .map((line) => {
    const [id, numbers] = line.replaceAll("  ", " ").split(":");
    const [winning, haved] = numbers.split("|");
    return {
      id: id.split(" ")[1],
      winning: winning.trim().split(" "),
      haved: haved.trim().split(" "),
    };
  })
  .map((card, index) => {
    const matchs = card.winning.filter((value) =>
      card.haved.includes(value)
    ).length;
    return { id: card.id, matchs, index };
  })
  .map((curr, _, original) => {
    const copies = original.slice(curr.index + 1, curr.index + 1 + curr.matchs);
    return generate(curr, copies, original);
  })
  .reduce((prev, curr) => {
    const cards = new Map(prev);
    const data = dfs(curr, new Map());

    for (const [key, value] of [...data]) {
      const amount = cards.get(key) ?? 0;
      cards.set(key, amount + value);
    }

    return cards;
  }, new Map<string, number>());

console.log([...response.values()].reduce((prev, curr) => prev + curr, 0));

type Card = { id: string; matchs: number; index: number };
type CardWithCopies = {
  id: string;
  matchs: number;
  index: number;
  copies: Array<CardWithCopies>;
};

function generate(
  start: Card,
  copies: Array<Card>,
  original: Array<Card>
): CardWithCopies {
  const updateCopies = copies.map((copie) => {
    const newCopies = original.slice(
      copie.index + 1,
      copie.index + 1 + copie.matchs
    );
    return generate(copie, newCopies, original);
  });

  return {
    ...start,
    copies: updateCopies,
  };
}

function dfs(start: CardWithCopies, cards: Map<string, number>) {
  const newCards = new Map(cards);
  const amount = newCards.get(start.id) ?? 0;
  newCards.set(start.id, amount + 1);

  for (const copie of start.copies) {
    const currCards = dfs(copie, newCards);
    for (const [key, value] of currCards) {
      newCards.set(key, value);
    }
  }

  return newCards;
}

// function dfs2(start: CardWithCopies, cards: Record<string, number>) {
//   const amount = cards[start.id] ?? 0;
//   const updatedCards = { ...cards, [start.id]: amount + 1 };

//   return start.copies.reduce((prev, curr) => dfs2(curr, prev), updatedCards);
// }

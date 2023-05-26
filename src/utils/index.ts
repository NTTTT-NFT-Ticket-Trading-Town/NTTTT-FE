export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`;
};

export const getRandomWalletAddr = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  return new Array(40)
    .fill(0)
    .map((_) => {
      const random = Math.random();
      if (random < 0.5) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
      }
    })
    .join("");
};

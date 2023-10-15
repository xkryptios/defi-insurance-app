export const weiToEth = (rawBalance: string) => {
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

export const getErrorMessage = (errorDump: string) => {
  const delimiter = '"';
  const tokens = errorDump.split(delimiter).slice(0, 2);
  return tokens.join(delimiter) + '"';
};

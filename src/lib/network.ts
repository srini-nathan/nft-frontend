export enum NETWORK_TYPES {
  MAINNET = "MAINNET",
  ROPSTEN = "ROPSTEN",
  LOCAL = "LOCAL",
}

export const defaultNetworkId: number = Number(
  process.env.REACT_APP_DEFAULT_NETWORK ?? 3
);

export const getEtherscanUri = (networkType: NETWORK_TYPES): string => {
  let prefix = "";
  switch (networkType) {
    case NETWORK_TYPES.ROPSTEN:
      prefix = "ropsten.";
    //break;
  }
  const uri = `https://${prefix}etherscan.io/`;

  return uri;
};

export const chainIdToNetworkType = (
  chainId: number | undefined
): NETWORK_TYPES => {
  if (!chainId) {
    chainId = defaultNetworkId;
  }
  switch (chainId) {
    case 1:
      return NETWORK_TYPES.MAINNET;
    case 3:
      return NETWORK_TYPES.ROPSTEN;
    default:
      return NETWORK_TYPES.LOCAL;
  }
};

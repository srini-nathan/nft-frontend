export function entries<O>(o: O) {
  return Object.entries(o) as [keyof O, O[keyof O]][];
}

type KnownContracts = keyof Network["contracts"];

const validNetworkId = (networkId: number): networkId is NetworkId => {
  return networks[networkId as NetworkId] !== undefined;
};

export type NetworkId = 1 | 3;

interface Network {
  label: string;
  url: string;

  contracts: {
    assetMarketPlaceAddress: string;
    assetDrivingAdress: string;
    assetNFTAddress: string;
  };
}

export const networkIds = {
  MAINNET: 1,
  ROPSTEN: 3,
} as const;

const networks: { [K in NetworkId]: Network } = {
  [networkIds.MAINNET]: {
    label: "Mainnet",
    url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    contracts: {
      assetMarketPlaceAddress: "0x2479e5e87A8d026b0594592174Ef73aBEb39B033",
      assetDrivingAdress: process.env.REACT_APP_ASSET_DRIVING_ADDRESS!,
      assetNFTAddress: process.env.REACT_APP_ASSET_NFT_ADDRESS!,
    },
  },
  [networkIds.ROPSTEN]: {
    label: "Ropsten",
    url: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    contracts: {
      assetMarketPlaceAddress: "0x2479e5e87A8d026b0594592174Ef73aBEb39B033",
      assetDrivingAdress: process.env.REACT_APP_ASSET_DRIVING_ADDRESS!,
      assetNFTAddress: process.env.REACT_APP_ASSET_NFT_ADDRESS!,
    },
  },
};

export const supportedNetworkIds = Object.keys(networks).map(
  Number
) as NetworkId[];

export const supportedNetworkURLs = entries(networks).reduce<{
  [networkId: number]: string;
}>(
  (acc, [networkId, network]) => ({
    ...acc,
    [networkId]: network.url,
  }),
  {}
);

export const infuraNetworkURL = networks[1].url;

export const getInfuraUrl = (networkId: number): string => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }
  return networks[networkId].url;
};

export const getContractAddress = (
  networkId: number,
  contract: KnownContracts
) => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }
  return networks[networkId].contracts[contract];
};

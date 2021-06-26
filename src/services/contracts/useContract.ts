import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { getContract } from "./GetContract";
import assetNFTAbi from "../contracts/abi/Asset.sol/Asset.json";
import assetDrivingAbi from "../contracts/abi/AssetDriving.sol/AssetDriving.json";
// import assetMarketPlaceAbi from "../contracts/abi/AssetMarketPlace.sol/AssetMarketPlace.json";

function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | undefined {
  const walletContext = useWeb3React<Web3Provider>();
  const { library, account } = walletContext;

  return useMemo(() => {
    if (!address || !ABI || !library) return undefined;
    try {
      return getContract(
        address!,
        ABI,
        library!,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return undefined;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useAssetNFTContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | undefined {
  return useContract(tokenAddress, assetNFTAbi.abi, withSignerIfPossible);
}

export function useAssetDrivingContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | undefined {
  return useContract(tokenAddress, assetDrivingAbi.abi, withSignerIfPossible);
}

// export function useAssetMarketPlaceContract(
//   tokenAddress?: string,
//   withSignerIfPossible?: boolean
// ): Contract | undefined {
//   return useContract(
//     tokenAddress,
//     assetMarketPlaceAbi.abi,
//     withSignerIfPossible
//   );
// }

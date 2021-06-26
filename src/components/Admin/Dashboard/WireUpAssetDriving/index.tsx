import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { getContractAddress } from "../../../../services/contracts/contractConnector";
import {
  useAssetDrivingContract,
  useAssetNFTContract,
} from "../../../../services/contracts/useContract";
import { AssetDrivingContainer } from "./AssetDrivingContainer";

export const WireUpAssetDriving = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";
    
  const assetDrivingAddress = chainId
    ? getContractAddress(chainId, "assetDrivingAdress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress && assetNFTAddress, true);
  const drivingInstance = useAssetDrivingContract(assetDrivingAddress && assetDrivingAddress, true);

  return (
    <>
      <AssetDrivingContainer
        instance={instance}
        drivingInstance={drivingInstance}
      />
    </>
  );
};

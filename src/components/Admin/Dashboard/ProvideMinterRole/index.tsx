import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { getContractAddress } from "../../../../services/contracts/contractConnector";
import { useAssetNFTContract } from "../../../../services/contracts/useContract";
import {ProvideMinterRoleContainer} from "./ProvideMinterRoleContainer"
export const ProvideMinterRole = () => {
    const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";


  const instance = useAssetNFTContract(assetNFTAddress && assetNFTAddress, true);
    return <ProvideMinterRoleContainer instance={instance}/>
}
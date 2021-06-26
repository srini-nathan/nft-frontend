import { MetadataJson } from "../../../types/metadata";
import { MintNFTContainer } from "./MintNFTContainer";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getContractAddress } from "../../../services/contracts/contractConnector";
import { useAssetNFTContract } from "../../../services/contracts/useContract";
import { GetMyNFTAssetDetails } from "../../../lib/hooks/useFetchNFTAsset";
import { ethers } from "ethers";

export const MintNFT = ({
  metadataJson,
  myNFTAsset,
}: {
  metadataJson: MetadataJson;
  myNFTAsset: GetMyNFTAssetDetails;
}) => {
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId, account, library } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress, true);

  const assetIndex = Number(metadataJson.patentId);
  const mintNFTProps: { assetIndex: number; owner: string; ipfsHash: string } =
    {
      assetIndex,
      owner: account!,
      ipfsHash: myNFTAsset._ipfsHash,
    };

  let topic = ethers.utils.id("Transfer(address,address,uint256)");

  let filter = {
    address: assetNFTAddress,
    topics: [topic, null, ethers.utils.hexZeroPad(account!, 32)],
  }
  

  library?.on(filter, (result) => {
    console.log(result);
  });

  return (
    <>
      <MintNFTContainer instance={instance} mintNFTInput={mintNFTProps} />
    </>
  );
};

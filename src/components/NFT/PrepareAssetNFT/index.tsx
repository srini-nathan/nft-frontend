import { MetadataJson } from "../../../types/metadata";
import { CreateAssetNFTContainer } from "./CreateAssetNFTContainer";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getContractAddress } from "../../../services/contracts/contractConnector";
import { useAssetNFTContract } from "../../../services/contracts/useContract";
import { ApolloQueryResult } from "@apollo/client";
import { GetMyNFTAsset } from "../../../graphql/queries/__generated__/GetMyNFTAsset";

export interface createAssetNFTProps {
  _assetPrice: number;
  _ipfsHash: string;
}

export const PrepareAssetNFT = ({
  metadataJson,
  refetch
}: {
  metadataJson: MetadataJson;
  refetch:() => Promise<ApolloQueryResult<GetMyNFTAsset>>
}) => {
  const { ipfsHash } = useParams<{ ipfsHash: string }>();

  const createAssetNFT: createAssetNFTProps = {
    _assetPrice: 0,
    _ipfsHash: ipfsHash,
  };

  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress, true);
  const assetIndex = Number(metadataJson.patentId);

  return (
    <CreateAssetNFTContainer
      instance={instance}
      createAssetNFT={createAssetNFT}
      assetIndex={assetIndex}
      refetch={refetch}
    />
  );
};

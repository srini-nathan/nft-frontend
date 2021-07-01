import { ApolloQueryResult } from "@apollo/client";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { GetMyNFTAsset } from "../../../graphql/queries/__generated__/GetMyNFTAsset";
import { GetMyNFTAssetDetails } from "../../../lib/hooks/useFetchNFTAsset";
import { useFetchTokenIdByAssetIndex } from "../../../lib/hooks/useFetchTokenIdByAssetIndex";
import { getContractAddress } from "../../../services/contracts/contractConnector";
import { useAssetNFTContract } from "../../../services/contracts/useContract";
import { MetadataJson } from "../../../types/metadata";
import { ListOverMarketPlaceContainer } from "./ListOverMarketPlaceContainer";

export const ListOverMarketPlace = ({
  metadataJson,
  myNFTAsset,
  refetch
}: {
  metadataJson: MetadataJson;
  myNFTAsset: GetMyNFTAssetDetails;
  refetch:() => Promise<ApolloQueryResult<GetMyNFTAsset>>;
}) => {
  const assetIndex = metadataJson.patentId;
  const { data, loading } = useFetchTokenIdByAssetIndex(assetIndex);
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress, true);

  if (loading) return <></>;
  const tokenId = data?.getTokenIdByAssetIndex;
  console.log(tokenId);

  const listOverMarkerInput = {
    _tokenId: Number(tokenId),
    _price: myNFTAsset._assetPrice,
  };

  return (
    <ListOverMarketPlaceContainer
      listOverMarkerInput={listOverMarkerInput}
      instance={instance}
      refetch={refetch}
    />
  );
};

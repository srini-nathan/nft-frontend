import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_MY_NFT_DETAILS } from "../../graphql/queries/GET_MY_NFT_DETAILS";

export interface NFTDetails {
  __typename: "NFTDetails";
  id: string;
  ipfsHash: string;
  assetIndex:string
  walletAddress:string
  nFTId: string | null;
}

export const useFetchMyNFT = () => {
  const { data, loading, error } = useQuery(GET_MY_NFT_DETAILS, {
    nextFetchPolicy: "network-only",
  });

  const [nFTData, setNFTData] = useState<NFTDetails[] | []>([]);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [loading]);

  useEffect(() => {
    data && setNFTData(data.getMyNFTDetails ?? []);
  }, [data]);

  return { nFTData };
};

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_MY_NFT_ASSET } from "../../graphql/queries/GET_MY_NFT_ASSET";

import {
  GetMyNFTAsset,
  GetMyNFTAssetVariables,
} from "../../graphql/queries/__generated__/GetMyNFTAsset";

export interface GetMyNFTAssetDetails {
  _assetPrice: number;
  _ipfsHash: string;
  _ownerAddress: string;
  _status: string;
}

export const defaultNFTAsset = {
  _assetPrice: 0,
  _ipfsHash: "",
  _ownerAddress: "0x0000000000000000000000000000000000000000",
  _status: "",
};

export const useFetchNFTAsset = (assetIndex: string) => {
  const { data, loading, refetch, error } = useQuery<
    GetMyNFTAsset,
    GetMyNFTAssetVariables
  >(GET_MY_NFT_ASSET, {
    nextFetchPolicy: "network-only",
    variables: { assetIndex },
  });

  const [myNFTAsset, setMyNFTAsset] =
    useState<GetMyNFTAssetDetails>(defaultNFTAsset);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [loading]);

  useEffect(() => {
    data && setMyNFTAsset(data.getMyNFTAsset ?? defaultNFTAsset);
  }, [data]);

  return {myNFTAsset:myNFTAsset ?? defaultNFTAsset, refetch};
};

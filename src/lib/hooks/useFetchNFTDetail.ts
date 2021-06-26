import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_NFT_BY_IPFS_HASH } from "../../graphql/queries/GET_NFT_BY_IPFS_HASH";
import {
  GetByIpfsHash,
  GetByIpfsHashVariables,
  GetByIpfsHash_getByIpfsHash_authentication,
  GetByIpfsHash_getByIpfsHash_media,
} from "../../graphql/queries/__generated__/GetByIpfsHash";

export interface GetMyIpfsHashDetail {
  image: string;
  description: string;
  name: string;
  assetFileName: string;
  patentId: string;
  media: GetByIpfsHash_getByIpfsHash_media;
  authentication: GetByIpfsHash_getByIpfsHash_authentication;
}

export const useFetchNFTDetail = (ipfsHash: string) => {
  const { data, loading, error } = useQuery<
    GetByIpfsHash,
    GetByIpfsHashVariables
  >(GET_NFT_BY_IPFS_HASH, {
    nextFetchPolicy: "network-only",
    variables: { ipfsHash },
  });

  const [myNFTDetail, setMyNFTDetail] =
    useState<GetMyIpfsHashDetail | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [loading]);
  
  

  useEffect(() => {
    data && setMyNFTDetail(data.getByIpfsHash);
  }, [data]);

  return { myNFTDetail };
};

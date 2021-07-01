import { useQuery } from "@apollo/client";
import { FETCH_USER_IPFS_BY_NFT_ID } from "../../graphql/queries/FETCH_USER_IPFS_BY_NFT_ID";
import {
  GetUserIPFSByNftId,
  GetUserIPFSByNftIdVariables,
} from "../../graphql/queries/__generated__/GetUserIPFSByNftId";

export const useFetchUserIPFSBynFTId = (nFTId: string) => {
  const { data, loading, error } = useQuery<
    GetUserIPFSByNftId,
    GetUserIPFSByNftIdVariables
  >(FETCH_USER_IPFS_BY_NFT_ID, {
    nextFetchPolicy: "network-only",
    variables: { nFTId },
  });

  return { data, loading, error };
};

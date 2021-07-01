import { useQuery } from "@apollo/client";
import { GET_MY_ASSET_COLLECTION } from "../../graphql/queries/GET_MY_ASSET_COLLECTION";
import { GetMyNFTCollectables } from "../../graphql/queries/__generated__/GetMyNFTCollectables";

export const useGetMyAssetCollection = (caller: string) => {
  const { data, loading, error } = useQuery<GetMyNFTCollectables>(
    GET_MY_ASSET_COLLECTION,
    { variables: { caller } }
  );

  return { data, loading, error };
};

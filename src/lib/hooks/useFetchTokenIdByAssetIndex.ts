import { useQuery } from "@apollo/client";
import { GET_TOKEN_ID_BY_ASSET_INDEX } from "../../graphql/queries/GET_TOKEN_ID_BY_ASSET_INDEX";

import {
  GetTokenIdByAssetIndex,
  GetTokenIdByAssetIndexVariables,
} from "../../graphql/queries/__generated__/GetTokenIdByAssetIndex";

export const useFetchTokenIdByAssetIndex = (assetIndex: string) => {
  const { data, loading, error } = useQuery<
    GetTokenIdByAssetIndex,
    GetTokenIdByAssetIndexVariables
  >(GET_TOKEN_ID_BY_ASSET_INDEX, {
    nextFetchPolicy: "network-only",
    variables: { assetIndex },
  });


  return { data, loading, error};
};

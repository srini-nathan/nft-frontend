import { useQuery } from "@apollo/client";
import { GET_TOKEN_OWNERSHIP } from "../../graphql/queries/GET_TOKEN_OWNERSHIP";
import {
  GetTokenOwnership,
  GetTokenOwnershipVariables,
} from "../../graphql/queries/__generated__/GetTokenOwnership";

export const useVerifyTokenOwnership = (assetIndex: string) => {
  const { data, loading, error } = useQuery<
    GetTokenOwnership,
    GetTokenOwnershipVariables
  >(GET_TOKEN_OWNERSHIP, {
    nextFetchPolicy: "network-only",
    variables: { assetIndex },
  });

  return { data, loading, error };
};

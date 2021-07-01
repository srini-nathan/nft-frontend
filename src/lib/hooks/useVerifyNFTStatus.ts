import { useQuery } from "@apollo/client";
import { VERIFY_NFT_STATUS } from "../../graphql/queries/VERIFY_NFT_STATUS";
import {
  VerifyNFTStatus,
  VerifyNFTStatusVariables,
} from "../../graphql/queries/__generated__/VerifyNFTStatus";

export const useVerifyNFTStatus = (assetIndex: string) => {
  const { data, loading, error } = useQuery<
    VerifyNFTStatus,
    VerifyNFTStatusVariables
  >(VERIFY_NFT_STATUS, {
    nextFetchPolicy: "network-only",
    variables: { assetIndex },
  });

  return { data, loading, error };
};

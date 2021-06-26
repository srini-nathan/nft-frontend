import { useQuery } from "@apollo/client";
import { VERIFY_ASSET_IS_ON_SALE } from "../../graphql/queries/VERIFY_ASSET_IS_ON_SALE";
import {
  VerifyAssetIsOnSale,
  VerifyAssetIsOnSaleVariables,
} from "../../graphql/queries/__generated__/VerifyAssetIsOnSale";

export const useVerifyAssetIsOnSale = (assetIndex: string) => {
  const { data, loading, error } = useQuery<
    VerifyAssetIsOnSale,
    VerifyAssetIsOnSaleVariables
  >(VERIFY_ASSET_IS_ON_SALE, {
    nextFetchPolicy: "network-only",
    variables: { assetIndex },
  });

  return { data, loading, error };
};

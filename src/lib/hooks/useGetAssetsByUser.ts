import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ASSETS_BY_USER } from "../../graphql/queries/GET_ASSETS_BY_USER";
import { GetAssetsByUser } from "../../graphql/queries/__generated__/GetAssetsByUser";

export interface GetAllUserListing {
  assetIndex: string;
  price: string;
}

export const useGetAssetsByUser = (ownerAddress: string) => {
  const { data, loading, error } = useQuery<GetAssetsByUser>(
    GET_ASSETS_BY_USER,
    { variables: { ownerAddress } }
  );

  return { data, loading, error };
};

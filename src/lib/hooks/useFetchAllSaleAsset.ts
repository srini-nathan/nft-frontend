import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_ASSET_SALE_LISTING } from "../../graphql/queries/GET_ALL_ASSET_SALE_LISTING";
import { GetAssetSaleListing } from "../../graphql/queries/__generated__/GetAssetSaleListing";

export interface GetAllListing {
  assetIndex: string;
  price: string;
}

export const useFetchAllSaleAsset = () => {
  const { data, loading, error } = useQuery<GetAssetSaleListing>(
    GET_ALL_ASSET_SALE_LISTING
  );

  const [allAssetOnSale, setAllAssetOnSale] = useState<GetAllListing[]>([]);

  useEffect(() => {
    if (loading) return;
    const allListing: GetAllListing[] =
      data?.getAllListings?.map((sale) => {
        return { assetIndex: sale?.assetIndex!, price: sale?.price! };
      }) ?? [];
    data && setAllAssetOnSale(allListing);
  }, [data, loading]);

  return allAssetOnSale;
};

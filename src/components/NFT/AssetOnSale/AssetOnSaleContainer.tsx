import { useFetchAllSaleAsset } from "../../../lib/hooks/useFetchAllSaleAsset";
import { ViewAssetOnSale } from "./ViewAssetOnSale";

export const AssetOnSaleContainer = ({account}:{account:string}) => {
  const AssetsInSale = useFetchAllSaleAsset();

  return (
    <div>
      {AssetsInSale.map((asset, index) => {
        const assetIndex = asset.assetIndex;
        const price = asset.price;

        return (
          <div key={index}>
            <ViewAssetOnSale assetIndex={assetIndex} price={price} account={account}/>
          </div>
        );
      })}
    </div>
  );
};

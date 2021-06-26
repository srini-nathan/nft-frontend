import { useFetchNFTAsset } from "../../../lib/hooks/useFetchNFTAsset";
import { useVerifyAssetIsOnSale } from "../../../lib/hooks/useVerifyAssetIsOnSale";
import { useFetchNFTDetail } from "../../../lib/hooks/useFetchNFTDetail";
import { ViewSaleAssetInfo } from "./ViewSaleAssetInfo";
import { usePrice } from "../../../lib/hooks/usePrice";
import { useFetchTokenIdByAssetIndex } from "../../../lib/hooks/useFetchTokenIdByAssetIndex";
import { useVerifyTokenOwnership } from "../../../lib/hooks/useVerifyTokenOwnership";

export const ViewAssetOnSale = ({
  assetIndex,
  price,
  account,
}: {
  assetIndex: string;
  price: string;
  account: string;
}) => {
  const { data, loading } = useVerifyAssetIsOnSale(assetIndex);
  const { _assetPrice, _ipfsHash, _ownerAddress } =
    useFetchNFTAsset(assetIndex);

  const { myNFTDetail } = useFetchNFTDetail(_ipfsHash);
  const { ethUSD } = usePrice();
  const { data: tokenIdByIndexData, loading: tokenIdByIndexLoading } =
    useFetchTokenIdByAssetIndex(assetIndex);
  const { data: tokenOwnerData, loading: tokenOwnerLoading } =
    useVerifyTokenOwnership(assetIndex);

  if (loading || !myNFTDetail || tokenIdByIndexLoading || tokenOwnerLoading)
    return <></>;

  const isAssetOnSale = data?.verifyAssetIsOnSale;
  const tokenId = tokenIdByIndexData?.getTokenIdByAssetIndex ?? "";
  const verifyAssetPrice = _assetPrice === Number(price);
  const tokenOwner = (tokenOwnerData?.getTokenOwnership ?? "") === account;

  return (
    <div>
      {isAssetOnSale && verifyAssetPrice && (
        <ViewSaleAssetInfo
          myNFTDetail={myNFTDetail}
          price={price}
          ethUSD={ethUSD}
          _ipfsHash={_ipfsHash}
          tokenId={tokenId}
          _ownerAddress={_ownerAddress}
          tokenOwner={tokenOwner}
        />
      )}
    </div>
  );
};

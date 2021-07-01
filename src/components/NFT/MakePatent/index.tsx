import { Container } from "react-bootstrap";
import { useFetchNFTAsset } from "../../../lib/hooks/useFetchNFTAsset";
import { useFetchNFTDetail } from "../../../lib/hooks/useFetchNFTDetail";
import { usePrice } from "../../../lib/hooks/usePrice";
import { useVerifyAssetIsOnSale } from "../../../lib/hooks/useVerifyAssetIsOnSale";
import { useFetchTokenIdByAssetIndex } from "../../../lib/hooks/useFetchTokenIdByAssetIndex";
import { MakePatentContainer } from "./MakePatentContainer";
import { useAssetNFTContract } from "../../../services/contracts/useContract";
import { getContractAddress } from "../../../services/contracts/contractConnector";
import { useVerifyTokenOwnership } from "../../../lib/hooks/useVerifyTokenOwnership";
import { OtherAssetsByUser } from "./OtherAssetsByUser";
import { useGetAssetsByUser } from "../../../lib/hooks/useGetAssetsByUser";

export const MakePatent = ({
  chainId,
  account,
  assetIndexHash,
  owner,
  id
}: {
  chainId: number | undefined;
  account: string;
  assetIndexHash?:string
  owner:string,
  id:string
}) => {
  
  // const { owner, id } = useParams<{ owner: string; id: string }>();
  const { data, loading } = useVerifyAssetIsOnSale(id);
  const { myNFTAsset, refetch } = useFetchNFTAsset(id);
  const { _assetPrice, _ipfsHash } = myNFTAsset;

  const { myNFTDetail } = useFetchNFTDetail(_ipfsHash);
  const { ethUSD } = usePrice();
  const { data: tokenIdByIndexData, loading: tokenIdByIndexLoading } =
    useFetchTokenIdByAssetIndex(id);

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress, true);
  const { data: tokenOwnerData, loading: tokenOwnerLoading } =
    useVerifyTokenOwnership(id);

  const { data: otherUserAssetsData, loading: otherUserAssetsLoading } =
    useGetAssetsByUser(owner);

  if (
    loading ||
    !myNFTDetail ||
    tokenIdByIndexLoading ||
    tokenOwnerLoading ||
    otherUserAssetsLoading
  )
    return <></>;

  const tokenId = tokenIdByIndexData?.getTokenIdByAssetIndex ?? "";

  const isAssetOnSale = data?.verifyAssetIsOnSale ?? false;
  const tokenOwner = (tokenOwnerData?.getTokenOwnership! ?? "") === account;

  const otherUserAssets = otherUserAssetsData?.getAssetsByUser ?? [];

  return (
    <>
      <Container>
        <MakePatentContainer
          myNFTDetail={myNFTDetail}
          tokenId={tokenId}
          ethUSD={ethUSD}
          _ipfsHash={_ipfsHash}
          _assetPrice={_assetPrice}
          isAssetOnSale={isAssetOnSale}
          instance={instance}
          tokenOwner={tokenOwner}
          assetIndexHash={assetIndexHash}
        />
      </Container>
      <br />
      <hr/>

      <div className="container">
        <h2>Other Assets in Sale</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {otherUserAssets.map((asset, index) => {
            return (
              <OtherAssetsByUser
                userAsset={asset}
                key={index}
                tokenOwner={tokenOwner}
                owner={owner}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

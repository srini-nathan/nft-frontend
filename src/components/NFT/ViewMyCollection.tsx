import { ethers } from "ethers";
import { useFetchNFTAsset } from "../../lib/hooks/useFetchNFTAsset";
import { useFetchNFTDetail } from "../../lib/hooks/useFetchNFTDetail";
import { usePrice } from "../../lib/hooks/usePrice";
import { Link } from "react-router-dom";

export const ViewMyCollection = ({
  assetIndex,
}: {
  assetIndex: string | null;
}) => {
  const { myNFTAsset } = useFetchNFTAsset(assetIndex ?? "");

  const { _assetPrice, _ipfsHash, _ownerAddress } = myNFTAsset;

  const { myNFTDetail } = useFetchNFTDetail(_ipfsHash);
  const { ethUSD } = usePrice();
  const assetIndexHash = ethers.utils.hashMessage(myNFTDetail?.patentId??"")

  if (myNFTDetail === null) return <></>;

  console.log(myNFTDetail);

  return (
    <div className="col mb-4">
      <div className="card border-0">
        <img src={myNFTDetail?.image} className="card-img-top" alt="..." />
        <div className="card-img-overlay h-100 d-flex flex-column justify-content-between">
          <div className="card-title d-flex bg-light">
            <h3 className="border border-0">{_assetPrice} ETH</h3>
            <b>
              $
              {(
                parseFloat(
                  ethers.utils.formatEther(
                    ethers.utils.parseEther(_assetPrice.toString())
                  )
                ) * ethUSD
              ).toFixed(2)}
            </b>
          </div>
          <Link to={`/nft/collectable/detail/${_ownerAddress}/${myNFTDetail?.patentId}/${assetIndexHash}`}>
            <span className="badge bg-light">View </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

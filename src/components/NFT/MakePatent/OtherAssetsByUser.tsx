import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { GetAssetsByUser_getAssetsByUser } from "../../../graphql/queries/__generated__/GetAssetsByUser";
import { useFetchNFTAsset } from "../../../lib/hooks/useFetchNFTAsset";
import { useFetchNFTDetail } from "../../../lib/hooks/useFetchNFTDetail";
import { usePrice } from "../../../lib/hooks/usePrice";

export const OtherAssetsByUser = ({
  userAsset,
  tokenOwner,
  owner
}: {
  userAsset: GetAssetsByUser_getAssetsByUser | null;
  tokenOwner:boolean,
  owner:string
}) => {
  const { _assetPrice, _ipfsHash } = useFetchNFTAsset(
    userAsset?.assetIndex ?? ""
  );
  const { myNFTDetail } = useFetchNFTDetail(_ipfsHash);
  const { ethUSD } = usePrice();

  return (
    <div className="col mb-4">
      <div className="card">
        <img src={myNFTDetail?.image} className="card-img-top"  alt="..." />
        <div className="card-body">
          <h5 className="card-title">{myNFTDetail?.name}</h5>
          <p className="card-footer">
          <h2 className="border border-0">{_assetPrice} ETH</h2>
            <strong>
              $
              {(
                parseFloat(
                  ethers.utils.formatEther(
                    ethers.utils.parseEther(_assetPrice.toString())
                  )
                ) * ethUSD
              ).toFixed(2)}
            </strong>
            <div className="d-flex justify-content-end mt-3">
                {!tokenOwner ? (
                  <Link
                    className="btn btn-block btn-primary"
                    to={`/nft/${owner}/${myNFTDetail?.patentId}`}
                  >
                    Buy now
                  </Link>
                ) : (
                  <h5 style={{ color: "black" }}>*It is your token*</h5>
                )}
              </div>
          </p>
        </div>
      </div>
    </div>
  );
};

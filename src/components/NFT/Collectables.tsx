import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useGetMyAssetCollection } from "../../lib/hooks/useGetMyAssetCollection";
import { ViewMyCollection } from "./ViewMyCollection";

export const Collectables = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account } = walletContext;

  const { data, loading } = useGetMyAssetCollection(account! ?? "");
  if (loading) return <></>;

  console.log(data);
  const myCollection = data?.getMyNFTCollectables ?? [];

  return (
    <div>
      <h2>Collection</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {myCollection.map((assetIndex, index) => {
          return <ViewMyCollection assetIndex={assetIndex} key={index} />;
        })}
      </div>
    </div>
  );
};

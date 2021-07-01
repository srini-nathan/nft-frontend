import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useFetchTokenIdByAssetIndex } from "../../../../lib/hooks/useFetchTokenIdByAssetIndex";
import { getContractAddress } from "../../../../services/contracts/contractConnector";
import { useAssetNFTContract } from "../../../../services/contracts/useContract";
import { ChangeSellingPriceContainer } from "./ChangeSellingPriceContainer";

export const UpdateSellingPrice = ({
  patentId,
  newPrice,
  isOnSale,
}: {
  patentId: string;
  newPrice: number;
  isOnSale: boolean;
}) => {
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;

  const assetNFTAddress = chainId
    ? getContractAddress(chainId, "assetNFTAddress")
    : "";

  const instance = useAssetNFTContract(assetNFTAddress, true);

  const { data: tokenIdByIndexData, loading: tokenIdByIndexLoading } =
    useFetchTokenIdByAssetIndex(patentId);

  if (tokenIdByIndexLoading) return <></>;

  const tokenId = tokenIdByIndexData?.getTokenIdByAssetIndex ?? "";

  const currentPrice =  parseFloat(
    ethers.utils.formatEther(
      ethers.utils.parseEther(newPrice.toString())
    )
  )
  

  return (
    <>
      {" "}
      {isOnSale && (
        <ChangeSellingPriceContainer
          tokenId={Number(tokenId)}
          instance={instance}
          newPrice={currentPrice}
        />
      )}
    </>
  );
};

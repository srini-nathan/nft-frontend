import { ethers } from "ethers";
import { useFetchNFTAsset } from "../../lib/hooks/useFetchNFTAsset";
import { useVerifyNFTStatus } from "../../lib/hooks/useVerifyNFTStatus";

export const VerifyNFTStatus = ({ assetIndex }: { assetIndex: string }) => {
  const { data, loading } = useVerifyNFTStatus(assetIndex);
  const { myNFTAsset } = useFetchNFTAsset(assetIndex);
  if (loading) return <></>;

  const status = data?.verifyNFTStatus ?? "";
  const currentOwnerZeros = myNFTAsset._ownerAddress === ethers.constants.AddressZero

  return <>{currentOwnerZeros ? "Ready" :status}</>;
};

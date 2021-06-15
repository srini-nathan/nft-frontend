import { UploadFileToIPFS } from "../../components/NFT/UploadFileToIPFS";
import { getProvider } from "../../services/ethereum/getProvider";

export const UploadItem = ({ chainId }: { chainId: number | undefined }) => {
  const provider = chainId && getProvider(chainId);

  return <UploadFileToIPFS provider={provider} />;
};

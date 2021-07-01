import { useParams } from "react-router-dom";
import { useFetchNFTDetail } from "../../../lib/hooks/useFetchNFTDetail";
import { validateJson } from "../../../services/nft/validate";
import { MetadataJson } from "../../../types/metadata";
import { ViewNFTDetail } from "./ViewNFTDetail";

export const NFTDetail = () => {
  const { ipfsHash } = useParams<{ ipfsHash: string }>();
  const { myNFTDetail } = useFetchNFTDetail(ipfsHash);
  

  if (!myNFTDetail) return <></>;

  const MetadataJson = {
    name: myNFTDetail?.name!,
    description: myNFTDetail?.description!,
    assetFileName: myNFTDetail?.assetFileName!,
    image: myNFTDetail?.image!,
    media: {
      dimensions: myNFTDetail?.media.dimensions!,
      mimeType: myNFTDetail?.media.mimeType!,
      size: myNFTDetail?.media.size!,
    },
    authentication: {
      metaDataHash: myNFTDetail?.authentication.metaDataHash!,
      signature: myNFTDetail?.authentication.signature!,
      creator: myNFTDetail?.authentication.creator!,
    },
    patentId: myNFTDetail?.patentId!,
  };

  const authenticateMetaData = async (MetadataJson: MetadataJson) => {
    return await validateJson(
      MetadataJson,
      myNFTDetail?.authentication.signature! ?? ""
    );
  };

  return (
    <>
      {authenticateMetaData(MetadataJson) && (
        <ViewNFTDetail metadataJson={MetadataJson}/>
      )}
    </>
  );
};

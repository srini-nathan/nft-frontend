import { MetadataJson } from "../../types/metadata";
import { validateJson } from "../../services/nft/validate";
import { pinJSONToIPFS } from "../../services/nft/ipfs";

export async function uploadMetadata(
  metadata: MetadataJson,
  signature: string
) {
  // First, validate the data is (probably) legit.
  if (!(await validateJson(metadata, signature))) return null;

  try {
    const pinJsonMetadataResult = await pinJSONToIPFS(metadata);
    return pinJsonMetadataResult.data && pinJsonMetadataResult.data.IpfsHash;
  } catch (error) {
    console.log(error);
    return;
  }
}

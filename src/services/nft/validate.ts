import { verifyMessage } from "ethers/lib/utils";
import { MetadataJson } from "../../types/metadata";
import hash from "object-hash";

export async function validateJson(metadata: MetadataJson, signature: string) {
  // First, lets check the signature of this upload
  const address = verifyMessage(
    metadata.authentication.metaDataHash!,
    signature
  );

  return (
    (await isValidJson(metadata)) && address === metadata.authentication.creator
  );
}

async function isValidJson(json: MetadataJson) {
  const authenticateMetaData = hash(json, {
    excludeKeys: (key) => key === "authentication",
  });

  return authenticateMetaData === json.authentication.metaDataHash!;
}

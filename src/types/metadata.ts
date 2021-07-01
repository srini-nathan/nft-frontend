export interface MetadataJson {
  name: string;
  description: string;
  assetFileName: string;
  image: string;
  media: {
    dimensions: string;
    mimeType: string;
    size: number | undefined;
  };
  authentication: {
    metaDataHash: string | undefined;
    signature: string | 0 | undefined;
    creator: string | 0 | undefined;
  };
  patentId: string;
}

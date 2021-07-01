import gql from "graphql-tag";

export const GET_NFT_BY_IPFS_HASH = gql`
  query GetByIpfsHash($ipfsHash: String!) {
    getByIpfsHash(ipfsHash: $ipfsHash) {
      image
      description
      name
      assetFileName
      patentId
      media {
        dimensions
        mimeType
        size
      }
      authentication {
        metaDataHash
        signature
        creator
      }
    }
  }
`;

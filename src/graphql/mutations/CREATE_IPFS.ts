import gql from "graphql-tag";

export const CREATE_IPFS = gql`
  mutation CreateIPFSHash(
    $ipfsHash: String!
    $assetIndex: String!
    $nftId: String
  ) {
    createIPFSHash(
      ipfsHash: $ipfsHash
      assetIndex: $assetIndex
      nftId: $nftId
    ) {
      feedback
    }
  }
`;

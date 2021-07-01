import gql from "graphql-tag";

export const UPDATE_WALLET_ADDRESS = gql`
  mutation UpdateWalletAddress(
    $ipfsHash: String!
    $nftId: String!
    $walletAddress: String!
  ) {
    updateWalletAddress(
      ipfsHash: $ipfsHash
      nftId: $nftId
      walletAddress: $walletAddress
    ) {
      feedback
    }
  }
`;

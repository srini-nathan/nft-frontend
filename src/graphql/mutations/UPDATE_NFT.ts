import gql from "graphql-tag";

export const UPDATE_NFT = gql`
  mutation UpdateNFT(
    $ipfsHash: String!
    $nftId: String!
    $isMinted: Boolean
    $isAssetReady: Boolean
  ) {
    updateNFT(
      ipfsHash: $ipfsHash
      nftId: $nftId
      isMinted: $isMinted
      isAssetReady: $isAssetReady
    ) {
      feedback
    }
  }
`;

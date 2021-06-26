import gql from "graphql-tag";

export const GET_MY_NFT_DETAILS = gql`
  query GetMyNFTDetails {
    getMyNFTDetails {
      id
      ipfsHash
      isMinted
      isAssetReady
      nFTId
    }
  }
`;

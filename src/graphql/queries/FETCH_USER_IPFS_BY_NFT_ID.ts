import gql from "graphql-tag";

export const FETCH_USER_IPFS_BY_NFT_ID = gql`
  query GetUserIPFSByNftId($nFTId: String!) {
    getUserIPFSByNftId(nFTId: $nFTId) {
      id
      walletAddress
    }
  }
`;

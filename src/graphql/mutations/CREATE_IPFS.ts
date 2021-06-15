import gql from "graphql-tag";

export const CREATE_IPFS = gql`
  mutation CreateIPFSHash($ipfsHash: String!, $nftId: String) {
    createIPFSHash(ipfsHash: $ipfsHash, nftId: $nftId) {
      feedback
    }
  }
`;

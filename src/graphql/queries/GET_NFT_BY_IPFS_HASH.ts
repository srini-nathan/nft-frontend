import gql from "graphql-tag";

export const GET_NFT_BY_IPFS_HASH = gql`
  query GetByIpfsHash($ipfsHash: String!) {
    getByIpfsHash(ipfsHash: $ipfsHash) {
      assetItem
      description
      name
    }
  }
`;

import gql from "graphql-tag";

export const GET_ASSETS_BY_USER = gql`
  query GetAssetsByUser($ownerAddress: String!) {
    getAssetsByUser(ownerAddress: $ownerAddress) {
      assetIndex
      price
    }
  }
`;

import gql from "graphql-tag";

export const GET_ALL_ASSET_SALE_LISTING = gql`
  query GetAssetSaleListing {
    getAllListings {
      assetIndex
      price
    }
  }
`;

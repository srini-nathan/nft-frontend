import gql from "graphql-tag";

export const VERIFY_ASSET_IS_ON_SALE = gql`
  query VerifyAssetIsOnSale($assetIndex: String!) {
    verifyAssetIsOnSale(assetIndex: $assetIndex)
  }
`;

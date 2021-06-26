import gql from "graphql-tag";

export const GET_TOKEN_ID_BY_ASSET_INDEX = gql`
  query GetTokenIdByAssetIndex($assetIndex: String!) {
    getTokenIdByAssetIndex(assetIndex: $assetIndex)
  }
`;

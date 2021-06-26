import gql from "graphql-tag";

export const GET_TOKEN_OWNERSHIP = gql`
  query GetTokenOwnership($assetIndex: String!) {
    getTokenOwnership(assetIndex: $assetIndex)
  }
`;

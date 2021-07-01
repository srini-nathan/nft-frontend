import gql from "graphql-tag";

export const GET_MY_ASSET_COLLECTION = gql`
  query GetMyNFTCollectables($caller: String!) {
    getMyNFTCollectables(caller: $caller)
  }
`;

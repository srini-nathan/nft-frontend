import gql from "graphql-tag";

export const FETCH_ALL_USER = gql`
  query GetAllUser {
    getAllUser {
      id
      email
      active
      role
      person {
        id
        firstName
        lastName
      }
      nft {
        id
      }
    }
  }
`;

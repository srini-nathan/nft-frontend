import gql from "graphql-tag";

export const VERIFY_ACCOUNT_HAS_MINT_ROLE = gql`
  query VerifyMintRole($accountAddress: String!) {
    verifyMintRole(accountAddress: $accountAddress)
  }
`;

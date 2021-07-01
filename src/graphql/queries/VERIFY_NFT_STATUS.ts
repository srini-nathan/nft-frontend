import gql from "graphql-tag";

export const VERIFY_NFT_STATUS = gql`
  query VerifyNFTStatus($assetIndex: String!) {
    verifyNFTStatus(assetIndex: $assetIndex)
  }
`;

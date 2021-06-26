import gql from "graphql-tag";

export const GET_MY_NFT_ASSET = gql`
  query GetMyNFTAsset($assetIndex:String!) {
    getMyNFTAsset(assetIndex: $assetIndex) {
      _assetPrice
      _ipfsHash
      _ownerAddress
      _status
    }
  }
`;

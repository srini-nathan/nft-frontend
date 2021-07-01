/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyNFTDetails
// ====================================================

export interface GetMyNFTDetails_getMyNFTDetails {
  __typename: "NFTDetails";
  id: string;
  ipfsHash: string;
  assetIndex: string;
  walletAddress: string | null;
  nFTId: string | null;
}

export interface GetMyNFTDetails {
  getMyNFTDetails: (GetMyNFTDetails_getMyNFTDetails | null)[] | null;
}

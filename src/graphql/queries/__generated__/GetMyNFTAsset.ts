/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyNFTAsset
// ====================================================

export interface GetMyNFTAsset_getMyNFTAsset {
  __typename: "MyNFTAsset";
  _assetPrice: number;
  _ipfsHash: string;
  _ownerAddress: string;
  _status: string;
}

export interface GetMyNFTAsset {
  getMyNFTAsset: GetMyNFTAsset_getMyNFTAsset | null;
}

export interface GetMyNFTAssetVariables {
  assetIndex: string;
}

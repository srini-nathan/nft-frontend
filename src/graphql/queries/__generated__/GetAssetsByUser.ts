/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAssetsByUser
// ====================================================

export interface GetAssetsByUser_getAssetsByUser {
  __typename: "AssetListInSale";
  assetIndex: string;
  price: string;
}

export interface GetAssetsByUser {
  getAssetsByUser: (GetAssetsByUser_getAssetsByUser | null)[] | null;
}

export interface GetAssetsByUserVariables {
  ownerAddress: string;
}

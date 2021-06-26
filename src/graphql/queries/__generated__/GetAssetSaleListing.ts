/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAssetSaleListing
// ====================================================

export interface GetAssetSaleListing_getAllListings {
  __typename: "AssetListInSale";
  assetIndex: string;
  price: string;
}

export interface GetAssetSaleListing {
  getAllListings: (GetAssetSaleListing_getAllListings | null)[] | null;
}

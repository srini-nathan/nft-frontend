/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetByIpfsHash
// ====================================================

export interface GetByIpfsHash_getByIpfsHash {
  __typename: "IpfsItem";
  assetItem: string;
  description: string;
  name: string;
}

export interface GetByIpfsHash {
  getByIpfsHash: GetByIpfsHash_getByIpfsHash | null;
}

export interface GetByIpfsHashVariables {
  ipfsHash: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetByIpfsHash
// ====================================================

export interface GetByIpfsHash_getByIpfsHash_media {
  __typename: "Media";
  dimensions: string;
  mimeType: string;
  size: number | null;
}

export interface GetByIpfsHash_getByIpfsHash_authentication {
  __typename: "Authentication";
  metaDataHash: string | null;
  signature: string | null;
  owner: string | null;
}

export interface GetByIpfsHash_getByIpfsHash {
  __typename: "IpfsItem";
  image: string;
  description: string;
  name: string;
  assetFileName: string;
  patentId: string;
  media: GetByIpfsHash_getByIpfsHash_media;
  authentication: GetByIpfsHash_getByIpfsHash_authentication;
}

export interface GetByIpfsHash {
  getByIpfsHash: GetByIpfsHash_getByIpfsHash | null;
}

export interface GetByIpfsHashVariables {
  ipfsHash: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserIPFSByNftId
// ====================================================

export interface GetUserIPFSByNftId_getUserIPFSByNftId {
  __typename: "NFTDetails";
  id: string;
  walletAddress: string | null;
}

export interface GetUserIPFSByNftId {
  getUserIPFSByNftId: (GetUserIPFSByNftId_getUserIPFSByNftId | null)[] | null;
}

export interface GetUserIPFSByNftIdVariables {
  nFTId: string;
}

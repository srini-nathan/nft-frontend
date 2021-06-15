/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateIPFSHash
// ====================================================

export interface CreateIPFSHash_createIPFSHash {
  __typename: "ApiCall";
  feedback: ApiFeedback | null;
}

export interface CreateIPFSHash {
  createIPFSHash: CreateIPFSHash_createIPFSHash | null;
}

export interface CreateIPFSHashVariables {
  ipfsHash: string;
  nftId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNFT
// ====================================================

export interface UpdateNFT_updateNFT {
  __typename: "ApiCall";
  feedback: ApiFeedback | null;
}

export interface UpdateNFT {
  updateNFT: UpdateNFT_updateNFT | null;
}

export interface UpdateNFTVariables {
  ipfsHash: string;
  nftId: string;
  isMinted?: boolean | null;
  isAssetReady?: boolean | null;
}

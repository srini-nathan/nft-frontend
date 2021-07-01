/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateWalletAddress
// ====================================================

export interface UpdateWalletAddress_updateWalletAddress {
  __typename: "ApiCall";
  feedback: ApiFeedback | null;
}

export interface UpdateWalletAddress {
  updateWalletAddress: UpdateWalletAddress_updateWalletAddress | null;
}

export interface UpdateWalletAddressVariables {
  ipfsHash: string;
  nftId: string;
  walletAddress: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllUser
// ====================================================

export interface GetAllUser_getAllUser_person {
  __typename: "Person";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetAllUser_getAllUser_nft {
  __typename: "NFT";
  id: string;
}

export interface GetAllUser_getAllUser {
  __typename: "User";
  id: string;
  email: string;
  active: boolean;
  role: string;
  person: GetAllUser_getAllUser_person | null;
  nft: GetAllUser_getAllUser_nft | null;
}

export interface GetAllUser {
  getAllUser: (GetAllUser_getAllUser | null)[] | null;
}

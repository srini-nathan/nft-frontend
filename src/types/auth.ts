import { SignUpVariables } from "../graphql/mutations/__generated__/SignUp";
import { MeQuery_me } from "../graphql/queries/__generated__/MeQuery";
import { Session, Token } from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  token: Token;
  user: MeQuery_me | null;
  register: (payload:SignUpVariables) => void;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

export type JwtItem = {
  email: string;
  userId: string;
  iat: number;
  exp: number;
};

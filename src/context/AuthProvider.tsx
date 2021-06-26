import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { isLoggedInVar, logUserIn, logUserOut, TOKEN } from "../apollo";
import { AuthContextValue, JwtItem } from "../types/auth";
import jwtDecode from "jwt-decode";
import useCurrentUser from "../lib/hooks/useCurrentUser";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/LOGIN";
import { MeQuery_me } from "../graphql/queries/__generated__/MeQuery";
import {
  Login,
  LoginVariables,
} from "../graphql/mutations/__generated__/Login";
import {
  SignUp,
  SignUpVariables,
} from "../graphql/mutations/__generated__/SignUp";
import { SIGNUP } from "../graphql/mutations/SIGNUP";
import { Spinner } from "../components/common/spinner";

type State = {
  token: JwtItem | null;
  user: MeQuery_me | null;
  login: (userData: LoginVariables) => void;
  register: (payload: SignUpVariables) => void;
  logout: () => void;
};

const initState: State = {
  token: null,
  user: null,
  login: (userData: LoginVariables) => {},
  register: (payload: SignUpVariables) => {},
  logout: () => {},
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

if (localStorage.getItem(TOKEN) && isLoggedInVar) {
  const decoded: JwtItem = jwtDecode(localStorage.getItem(TOKEN) as any);
  if (decoded.exp * 1000 < Date.now()) {
    logUserOut();
  } else {
    initState.token = { ...decoded };
  }
}

const AuthContext = createContext(initState);

const authReducer = (state: State, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.payload, user: action.payload };
    case "REGISTER":
      return { ...state, token: action.payload, user: action.payload };
    case "LOGOUT":
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props: Object) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const { data: userData, loading } = useCurrentUser();
  const [loginUser] = useMutation<Login, LoginVariables>(LOGIN);
  const [registerUser] = useMutation<SignUp, SignUpVariables>(SIGNUP);



  useEffect(() => {
    (async () => {
      if (userData === undefined) return; //means no token
      if (loading) return
      initState.user = userData.me

      const token = localStorage.getItem(TOKEN);
      if (!token) return;
      setToken(token);
      setUser(initState.user);
      
    })();
  }, [userData, initState, loading]);

  const login: AuthContextValue["login"] = async ({ email, password }) => {
    const { data, errors } = await loginUser({
      variables: { email, password },
    });

    // temp validation, could be better
    if (errors || !data) return null;
    if (loading) return null

    const token = data.login?.token!;

    logUserIn(token);
    setToken(token);
    setUser(user);
    // return data.loginUser;

    dispatch({
      type: "LOGIN",
      payload: { user, token },
    });
  };

  const logout = () => {
    logUserOut();
    setToken("");
    setUser(null);
    dispatch({
      type: "LOGOUT",
    });
  };

  const register: AuthContextValue["register"] = async (registerPayload) => {
    const { data, errors } = await registerUser({
      variables: { ...registerPayload },
    });

    if (errors || !data) return null;
    // return data.signup?.token;

    logUserIn(token);
    setToken(token);
    setUser(user);

    dispatch({
      type: "REGISTER",
      payload: { user, token },
    });
  };

  if (loading) return <Spinner size={30} />;

  return (
    <AuthContext.Provider
      value={{ token: state.token, user: state.user, login, logout, register }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

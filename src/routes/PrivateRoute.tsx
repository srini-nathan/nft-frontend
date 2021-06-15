import React from "react";
import {
  RouterProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries/ME_QUERY";

import { Route as ROUTES } from "./constant/routes";

interface IProps extends Partial<RouterProps> {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}: IProps) => {
  const { data, error, loading } = useQuery(ME_QUERY);
  if (loading) return <h3>Loading...</h3>;
  const isAuthorizedAdmin = isLoggedInVar() && data?.me?.role === "Admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorizedAdmin ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

import React from "react";
import {
  RouterProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { useQuery } from "@apollo/client";

import { Route as ROUTES } from "./constant/routes";
import { ME_QUERY } from "../graphql/queries/ME_QUERY";

interface IProps extends Partial<RouterProps> {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  path: string;
}

const CreatorRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}: IProps) => {
  const { data, loading } = useQuery(ME_QUERY);

  if (loading) return <h3>Loading...</h3>;
  const isAuthorizedCreator = isLoggedInVar() && data?.me?.role === "Creator";
  const isAuthorizedAdmin = isLoggedInVar() && data?.me?.role === "Admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorizedCreator || isAuthorizedAdmin ? (
          <Component {...props} />
        ) : isAuthorizedAdmin ? (
          <Redirect to={ROUTES.ADMIN_DASHBOARD} />
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

export default CreatorRoute;

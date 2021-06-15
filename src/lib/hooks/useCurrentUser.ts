import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../apollo";
import { ME_QUERY } from "../../graphql/queries/ME_QUERY";
import { MeQuery } from "../../graphql/queries/__generated__/MeQuery";

const useCurrentUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);

  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, {
    skip: !hasToken,
  });


  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data, loading, error };
};

export default useCurrentUser;

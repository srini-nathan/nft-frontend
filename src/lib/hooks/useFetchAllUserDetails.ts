import { useQuery } from "@apollo/client";
import { FETCH_ALL_USER } from "../../graphql/queries/FETCH_ALL_USER";
import { GetAllUser } from "../../graphql/queries/__generated__/GetAllUser";


export const useFetchAllUserDetails = () => {
  const { data, loading, error } = useQuery<GetAllUser>(FETCH_ALL_USER, {
    nextFetchPolicy: "network-only",
  });

  return { data, loading, error }
};

import { useQuery } from "@apollo/client";
import { VERIFY_ACCOUNT_HAS_MINT_ROLE } from "../../graphql/queries/VERIFY_ACCOUNT_HAS_MINT_ROLE";

import {
  VerifyMintRole,
  VerifyMintRoleVariables,
} from "../../graphql/queries/__generated__/VerifyMintRole";

export const useVerifyAccountHasMintRole = (accountAddress: string) => {
  const { data, loading, error } = useQuery<
    VerifyMintRole,
    VerifyMintRoleVariables
  >(VERIFY_ACCOUNT_HAS_MINT_ROLE, {
    nextFetchPolicy: "network-only",
    variables: { accountAddress },
  });

  return { data, loading, error };
};

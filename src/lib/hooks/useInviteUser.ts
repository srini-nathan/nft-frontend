import { useMutation } from "@apollo/client";
import { INVITE_USER } from "../../graphql/mutations/INVITE_USER";
import {
  InviteUser,
  InviteUserVariables,
} from "../../graphql/mutations/__generated__/InviteUser";

export const useInviteUser = () => {
  const [inviteUser, { data, error, loading }] = useMutation<
    InviteUser,
    InviteUserVariables
  >(INVITE_USER, {
    errorPolicy: "all",
  });
  const InviteUser = async (values: { email: string; role: string }) => {
    try {
      await inviteUser({
        variables: values,
      });
    } catch (err) {}
  };
  return {
    inviteUser: InviteUser,
    data: data && data.inviteUser?.feedback,
    error,
    loading,
  };
};

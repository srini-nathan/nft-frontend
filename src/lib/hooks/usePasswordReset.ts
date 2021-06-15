import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/mutations/RESET_PASSWORD";
import {
  ResetPassword,
  ResetPasswordVariables,
} from "../../graphql/mutations/__generated__/ResetPassword";

export const usePasswordReset = () => {
  const [resetPassword, { data, error, loading }] = useMutation<
    ResetPassword,
    ResetPasswordVariables
  >(RESET_PASSWORD, {
    errorPolicy: "all",
  });
  const ResetPassword = async (values: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await resetPassword({
        variables: values,
      });
    } catch (err) {}
  };
  return {
    resetPassword: ResetPassword,
    data: data && data.resetPassword?.feedback,
    error,
    loading,
  };
};

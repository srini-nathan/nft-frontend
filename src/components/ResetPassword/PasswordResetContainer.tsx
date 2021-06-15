import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { ChangePasswordSchema } from "../../schemaValidation/ChangePasswordSchema";
import { PasswordResetForm } from "./PasswordResetForm";
import _ from "lodash";
import ErrorMessage from "../common/ErrorMessage";
import { usePasswordReset } from "../../lib/hooks/usePasswordReset";
import useCurrentUser from "../../lib/hooks/useCurrentUser";
import { Spinner } from "../common/spinner";
import useNotification from "../../lib/hooks/useNotification";
import NotificationDrawer from "../../components/NotificationDrawer/NotificationDrawer";

const initialPasswordResetValues = {
  currentPassword: "",
  newPassword: "",
  verifyPassword: "",
};

export type PasswordResetFormSubmitT = {
  currentPassword: string;
  newPassword: string;
  verifyPassword: string;
};

export const PasswordResetContainer = () => {
  const [resetPasswordErrors, setResetPasswordErrors] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: initialPasswordResetValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: async (
      values: PasswordResetFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await passowrdReset(values);
      formikHelpers.resetForm();
    },
  });

  const {
    data: passwordResetData,
    resetPassword,
    loading: passwordResetLoading,
  } = usePasswordReset();

  const { data, loading } = useCurrentUser();
  const { addNotification } = useNotification();

  useEffect(() => {
    if (passwordResetData) {
      addNotification("Password Reset Successfully");
    }
  }, [passwordResetData]);

  if (loading || passwordResetLoading) return <Spinner size={30} />;
  const email = data?.me?.email!;

  const passowrdReset = async (values: PasswordResetFormSubmitT) => {
    try {
      await resetPassword({
        email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setResetPasswordErrors([...errorMessages]);
    }
  };

  return (
    <>
      <ErrorMessage errors={resetPasswordErrors} />
      <NotificationDrawer />
      <FormikProvider value={formik}>
        <Form>
          <PasswordResetForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import _ from "lodash";
import ErrorMessage from "../common/ErrorMessage";
import { InviteUserForm } from "./InviteUserForm";
import { InviteUserSchema } from "../../schemaValidation/InviteUserSchema";
import useCurrentUser from "../../lib/hooks/useCurrentUser";
import { Spinner } from "../common/spinner";
import { useInviteUser } from "../../lib/hooks/useInviteUser";
import NotificationDrawer from "../../components/NotificationDrawer/NotificationDrawer";
import useNotification from "../../lib/hooks/useNotification";

const initialInviteUserValues = {
  email: "",
};

export type InviteUserFormSubmitT = {
  email: string;
};

export const InviteUserContainer = () => {
  const [inviteUserErrors, setInviteUserErrors] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: initialInviteUserValues,
    validationSchema: InviteUserSchema,
    onSubmit: async (
      values: InviteUserFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await inviteExternalUser(values);
      formikHelpers.resetForm();
    },
  });

  const {
    data: inviteUserData,
    inviteUser,
    loading: inviteUserLoading,
  } = useInviteUser();
  const { data, loading } = useCurrentUser();
  const { addNotification } = useNotification();
  useEffect(() => {
    if (inviteUserData) {
      addNotification("Invite User Success");
    }
  }, [inviteUserData]);

  if (loading || inviteUserLoading) return <Spinner size={30} />;
  const role = data?.me?.role === "Creator" ? "Creator" : "Admin";

  const inviteExternalUser = async (values: InviteUserFormSubmitT) => {
    try {
      await inviteUser({
        email: values.email,
        role,
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
      setInviteUserErrors([...errorMessages]);
    }
  };

  return (
    <>
      <NotificationDrawer />
      <ErrorMessage errors={inviteUserErrors} />
      <FormikProvider value={formik}>
        <Form>
          <InviteUserForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

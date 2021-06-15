import { FC, useContext, useState } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { LoginForm } from "./LoginForm";
import _ from "lodash";
import ErrorMessage from "../common/ErrorMessage";
import { AuthContext } from "../../context/AuthProvider";
import { history } from "../../layout/Layout";

const initialLoginValues = {
  email: "",
  password: "",
};

export type LoginFormSubmitT = {
  email: string;
  password: string;
};

const LoginContainer: FC = () => {
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const { login } = useContext(AuthContext);

  const handleLogin = async ({ email, password }: LoginFormSubmitT) => {
    try {
      login({ email, password });
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setLoginErrors([...errorMessages]);
    }
  };

  const formik = useFormik({
    initialValues: initialLoginValues,
    onSubmit: async (
      values: LoginFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleLogin(values);
      formikHelpers.resetForm();
      history.replace("/");
    },
  });

  return (
    <>
      <ErrorMessage errors={loginErrors} />
      <FormikProvider value={formik}>
        <Form>
          <LoginForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

export default LoginContainer;

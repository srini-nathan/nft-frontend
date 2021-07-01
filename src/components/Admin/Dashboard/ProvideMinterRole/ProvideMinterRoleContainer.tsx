import { useState } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { ProvideMinterRoleForm } from "./ProvideMinterRoleForm";
import _ from "lodash";
import ErrorMessage from "../../../common/ErrorMessage";
import { ProvideMinterRoleSchema } from "../../../../schemaValidation/ProvideMinterRoleSchema";
import { Contract } from "ethers";
import { useNotification } from "../../../../lib/useNotification";

const initialLoginValues = {
  walletAddress: "",
};

export type ProvideMinterRoleFormSubmitT = {
  walletAddress: string;
};

export const ProvideMinterRoleContainer = ({
  instance,
}: {
  instance: Contract | undefined;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();

  const handleProvideMinterRole = async ({
    walletAddress,
  }: ProvideMinterRoleFormSubmitT) => {
    let transactionObject;
    try {
      transactionObject =
        instance && (await instance.addMinterRole(walletAddress));

      const TransactionReceipt =
        instance &&
        (await instance?.provider.waitForTransaction(transactionObject.hash));
      if (TransactionReceipt) {
        success("Success", "Transaction executed successfully");
      }
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setErrors([...errorMessages]);
    }
  };

  const formik = useFormik({
    initialValues: initialLoginValues,
    validationSchema: ProvideMinterRoleSchema,
    onSubmit: async (
      values: ProvideMinterRoleFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleProvideMinterRole(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <>
      <ErrorMessage errors={errors} />
      <FormikProvider value={formik}>
        <Form>
          <ProvideMinterRoleForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

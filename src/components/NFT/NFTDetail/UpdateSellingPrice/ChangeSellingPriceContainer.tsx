import { Contract, ethers } from "ethers";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useNotification } from "../../../../lib/useNotification";
import ErrorMessage from "../../../common/ErrorMessage";
import { ChangeSellingPriceForm } from "./ChangeSellingPriceForm";
import _ from "lodash";
import { UpdateSellingPriceSchema } from "../../../../schemaValidation/UpdateSellingPriceSchema";

export type ChangeSellingPriceSubmitT = {
  newPrice: number;
  tokenId: number;
};

export const ChangeSellingPriceContainer = ({
  instance,
  tokenId,
  newPrice,
}: {
  instance: Contract | undefined;
  tokenId: number;
  newPrice: number;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();

  const handleUpdateSellingPrice = async (
    values: ChangeSellingPriceSubmitT
  ) => {
    try {
      let transactionObject;
      transactionObject =
        instance &&
        (await instance.changeSellingPrice(
          values.tokenId,
          ethers.utils.parseEther(newPrice.toString())
        ));

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
    initialValues: { tokenId, newPrice },
    validationSchema: UpdateSellingPriceSchema,
    onSubmit: async (
      values: ChangeSellingPriceSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleUpdateSellingPrice(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <>
      <ErrorMessage errors={errors} />
      <FormikProvider value={formik}>
        <Form>
          <ChangeSellingPriceForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

import react from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import _ from "lodash";
import ErrorMessage from "../../common/ErrorMessage";

import { useNotification } from "../../../lib/useNotification";
import { ListOverMarketPlaceForm } from "./ListOverMarketPlaceForm";
import { Contract, ethers } from "ethers";

export type ListForSaleSubmitT = {
  listOverMarkerInput: { _tokenId: number; _price: number };
};

export const ListOverMarketPlaceContainer = ({
  listOverMarkerInput,
  instance,
}: {
  listOverMarkerInput: { _tokenId: number; _price: number };
  instance: Contract | undefined;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();

  const formik = useFormik({
    initialValues: { listOverMarkerInput },
    onSubmit: async (
      values: ListForSaleSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await listForSale(values);
      formikHelpers.resetForm();
    },
  });

  // if (currentLoading || updateNFTLoading) return <Spinner size={30} />

  const listForSale = async (values: ListForSaleSubmitT) => {
    const _price = ethers.utils.parseEther(
      values.listOverMarkerInput._price.toString()
    );
    try {
      let transactionObject;
      transactionObject =
        instance &&
        (await instance.putToSell(values.listOverMarkerInput._tokenId, _price));

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

  return (
    <>
      <ErrorMessage errors={errors} />
      <FormikProvider value={formik}>
        <Form>
          <ListOverMarketPlaceForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

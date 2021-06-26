import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import _ from "lodash";
import ErrorMessage from "../../common/ErrorMessage";
import { Spinner } from "../../common/spinner";

import { CreateAssetNFTForm } from "./CreateAssetNFTForm";
import { CreateAssetNFTSchema } from "../../../schemaValidation/CreateAssetNFTSchema";
import { createAssetNFTProps } from ".";
import { Contract, ethers } from "ethers";
import { useNotification } from "../../../lib/useNotification";
import useCurrentUser from "../../../lib/hooks/useCurrentUser";
import { useUpdateNFT } from "../../../lib/hooks/useUpdateNFT";
import { Button } from "react-bootstrap";

const InitialCreateAssetNFTValues = {
  tokenPrice: "",
};

export type CreateAssetNFTFormSubmitT = {
  tokenPrice: string;
};

export const CreateAssetNFTContainer = ({
  instance,
  createAssetNFT,
  assetIndex,
  ipfsHash,
}: {
  instance: Contract | undefined;
  createAssetNFT: createAssetNFTProps;
  assetIndex: number;
  ipfsHash: string;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();
  const { data: currentUserData, loading: currentLoading } = useCurrentUser();
  const { update_NFT, loading: updateNFTLoading } = useUpdateNFT();

  const formik = useFormik({
    initialValues: InitialCreateAssetNFTValues,
    validationSchema: CreateAssetNFTSchema,
    onSubmit: async (
      values: CreateAssetNFTFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await prepareNFT(values);
      formikHelpers.resetForm();
    },
  });

  console.log(instance);
  

  if (currentLoading || updateNFTLoading) return <Spinner size={30} />;
  const nftId = currentUserData?.me?.nft?.id ?? "";

  const prepareNFT = async (values: CreateAssetNFTFormSubmitT) => {
    try {
      const prepareAssetNFT = {
        ...createAssetNFT,
        _assetPrice: ethers.utils.parseEther(values.tokenPrice.toString()),
      };

      let transactionObject;
      transactionObject =
        instance &&
        (await instance.addAsset(
          prepareAssetNFT._assetPrice,
          prepareAssetNFT._ipfsHash,
          assetIndex
        ));

      const TransactionReceipt =
        instance &&
        (await instance?.provider.waitForTransaction(transactionObject.hash));
      if (TransactionReceipt) {
        await update_NFT({ ipfsHash, nftId, isAssetReady: true });
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
          <CreateAssetNFTForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

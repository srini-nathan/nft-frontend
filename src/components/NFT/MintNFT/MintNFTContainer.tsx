import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import _ from "lodash";
import ErrorMessage from "../../common/ErrorMessage";
import { Spinner } from "../../common/spinner";

import { MintNFTForm } from "./MintNFTForm";
import { Contract } from "ethers";
import { useNotification } from "../../../lib/useNotification";
import { useUpdateNFT } from "../../../lib/hooks/useUpdateNFT";
import useCurrentUser from "../../../lib/hooks/useCurrentUser";

export type MintNFTFormSubmitT = {
  assetIndex: number;
  owner: string;
};

export const MintNFTContainer = ({
  instance,
  mintNFTInput,
}: {
  instance: Contract | undefined;
  mintNFTInput: { assetIndex: number; owner: string; ipfsHash: string };
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();
  const { data: currentUserData, loading: currentLoading } = useCurrentUser();
  const { update_NFT, loading: updateNFTLoading } = useUpdateNFT();

  

  const formik = useFormik({
    initialValues: {
      assetIndex: mintNFTInput.assetIndex,
      owner: mintNFTInput.owner,
    },
    onSubmit: async (
      values: MintNFTFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await mintNFT(values);
      formikHelpers.resetForm();
    },
  });

  if (currentLoading || updateNFTLoading) return <Spinner size={30} />;
  const nftId = currentUserData?.me?.nft?.id ?? "";

  const mintNFT = async (values: MintNFTFormSubmitT) => {
    try {
      let transactionObject;
      transactionObject =
        instance && (await instance.mint(values.assetIndex, values.owner));

      const TransactionReceipt =
        instance &&
        (await instance?.provider.waitForTransaction(transactionObject.hash));
      if (TransactionReceipt) {
        await update_NFT({
          ipfsHash: mintNFTInput.ipfsHash,
          nftId,
          isMinted: true,
        });
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
          <MintNFTForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

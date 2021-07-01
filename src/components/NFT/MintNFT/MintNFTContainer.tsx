import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import _ from "lodash";
import ErrorMessage from "../../common/ErrorMessage";
import { Spinner } from "../../common/spinner";

import { MintNFTForm } from "./MintNFTForm";
import { Contract } from "ethers";
import { useNotification } from "../../../lib/useNotification";
import useCurrentUser from "../../../lib/hooks/useCurrentUser";
import { ApolloQueryResult } from "@apollo/client";
import { GetMyNFTAsset } from "../../../graphql/queries/__generated__/GetMyNFTAsset";
import { MinterRoleAccessContainer } from "./MinterRoleAccessContainer";

export type MintNFTFormSubmitT = {
  assetIndex: number;
  owner: string;
};

export const MintNFTContainer = ({
  instance,
  mintNFTInput,
  refetch,
  isUserHasMinterRole,
  chainId,
}: {
  instance: Contract | undefined;
  mintNFTInput: { assetIndex: number; owner: string; ipfsHash: string };
  refetch: () => Promise<ApolloQueryResult<GetMyNFTAsset>>;
  isUserHasMinterRole: boolean;
  chainId: number | undefined;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { success } = useNotification();
  const { data: currentUserData, loading: currentLoading } = useCurrentUser();


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

  if (currentLoading) return <Spinner size={30} />;
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
        
        success("Success", "Transaction executed successfully");
        refetch();
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

  if (!isUserHasMinterRole) {
    return (
      <MinterRoleAccessContainer
        accountAddress={mintNFTInput.owner}
        chainId={chainId}
        ipfsHash={mintNFTInput.ipfsHash}
        nftId={nftId}
      />
    );
  }

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

import { useMutation } from "@apollo/client";
import { UPDATE_WALLET_ADDRESS } from "../../graphql/mutations/UPDATE_WALLET_ADDRESS";
import {
  UpdateWalletAddress,
  UpdateWalletAddressVariables,
} from "../../graphql/mutations/__generated__/UpdateWalletAddress";
import { GET_MY_NFT_DETAILS } from "../../graphql/queries/GET_MY_NFT_DETAILS";

export const useUpdateWalletAddress = () => {
  const [updateWalletAddress, { data, error, loading }] = useMutation<
    UpdateWalletAddress,
    UpdateWalletAddressVariables
  >(UPDATE_WALLET_ADDRESS, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_MY_NFT_DETAILS }],
  });
  const UpdateWalletAddress = async (values: {
    ipfsHash: string;
    nftId: string;
    walletAddress: string;
  }) => {
    try {
      await updateWalletAddress({
        variables: values,
      });
    } catch (err) {}
  };
  return {
    updateWalletAddress: UpdateWalletAddress,
    data: data && data.updateWalletAddress?.feedback,
    error,
    loading,
  };
};

import { useMutation } from "@apollo/client";
import { UPDATE_NFT } from "../../graphql/mutations/UPDATE_NFT";
import {
  UpdateNFT,
  UpdateNFTVariables,
} from "../../graphql/mutations/__generated__/UpdateNFT";
import { GET_MY_NFT_DETAILS } from "../../graphql/queries/GET_MY_NFT_DETAILS";

export const useUpdateNFT = () => {
  const [updateNFT, { data, error, loading }] = useMutation<
    UpdateNFT,
    UpdateNFTVariables
  >(UPDATE_NFT, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_MY_NFT_DETAILS }],
  });
  const Update_NFT = async (values: {
    ipfsHash: string;
    nftId: string;
    isAssetReady?: boolean;
    isMinted?:boolean
  }) => {
    try {
      await updateNFT({
        variables: values,
      });
    } catch (err) {}
  };
  return {
    update_NFT: Update_NFT,
    data: data && data.updateNFT?.feedback,
    error,
    loading,
  };
};

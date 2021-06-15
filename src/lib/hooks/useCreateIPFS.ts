import { useMutation } from "@apollo/client";
import { CREATE_IPFS } from "../../graphql/mutations/CREATE_IPFS";
import {
  CreateIPFSHash,
  CreateIPFSHashVariables,
} from "../../graphql/mutations/__generated__/CreateIPFSHash";
import { GET_MY_NFT_DETAILS } from "../../graphql/queries/GET_MY_NFT_DETAILS";

export const useCreateIPFS = () => {
  const [createNFT_IPFS, { data, error, loading }] = useMutation<
    CreateIPFSHash,
    CreateIPFSHashVariables
  >(CREATE_IPFS, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_MY_NFT_DETAILS }],
  });
  const CreateNFT_IPFS = async (values: {
    ipfsHash: string;
    nftId: string | null;
  }) => {
    try {
      await createNFT_IPFS({
        variables: values,
      });
    } catch (err) {}
  };
  return {
    createNFT_IPFS: CreateNFT_IPFS,
    data: data && data.createIPFSHash?.feedback,
    error,
    loading,
  };
};

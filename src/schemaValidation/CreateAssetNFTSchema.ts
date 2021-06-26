import * as Yup from "yup";
export const CreateAssetNFTSchema = Yup.object().shape({
  tokenPrice:Yup.string().required("Field cannot be blank")
});
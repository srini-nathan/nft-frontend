import * as Yup from "yup";
export const InitialMintPreviewSchema = Yup.object().shape({
  tokenName: Yup.string().required("Field cannot be blank"),
  tokenSymbol: Yup.string().required("Field cannot be blank").min(3, 'Minimum 3 char')
  .max(5, 'Maximum 5 char'),
  tokenPrice:Yup.string().required("Field cannot be blank")
});

import * as Yup from "yup";
export const ProvideMinterRoleSchema = Yup.object().shape({
  walletAddress:Yup.string().required("Field cannot be blank")
});
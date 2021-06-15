import * as Yup from "yup";
export const InitialMetaDetailsSchema = Yup.object().shape({
  nftName: Yup.string().required("Field cannot be blank"),
  nftDescription: Yup.string().required("Field cannot be blank"),
});

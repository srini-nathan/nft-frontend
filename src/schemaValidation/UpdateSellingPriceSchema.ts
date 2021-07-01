import * as Yup from "yup";
export const UpdateSellingPriceSchema = Yup.object().shape({
  newPrice:Yup.string().required("Field cannot be blank")
});
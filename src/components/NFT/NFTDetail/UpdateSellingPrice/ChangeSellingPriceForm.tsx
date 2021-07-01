import { FC } from "react";
import { Button } from "react-bootstrap";
import { InputWithValidation } from "../../../form/InputWithValidation";

interface ChangeSellingPriceFormProps {
  formik: any;
}

export const ChangeSellingPriceForm: FC<ChangeSellingPriceFormProps> = ({
  formik,
}: ChangeSellingPriceFormProps) => {
  return (
    <>
      <InputWithValidation
        label="New Price"
        id="newPrice"
        type="number"
        placeholder="Enter Price In ETH"
        formik={formik}
      />

      <button
        type="submit"
        className="btn btn-outline-secondary hvr mt-2"
      >
        Update Price
      </button>
    </>
  );
};

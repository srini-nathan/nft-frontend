import { FC } from "react";
import { InputWithValidation } from "../../../form/InputWithValidation";
import { Card } from "react-bootstrap";

interface ProvideMinterRoleFormProps {
  formik: any;
}

export const ProvideMinterRoleForm: FC<ProvideMinterRoleFormProps> = ({
  formik,
}: ProvideMinterRoleFormProps) => {
  return (
    <Card style={{ width: "23%" }} className="border-0">
      <InputWithValidation
        label=""
        id="walletAddress"
        type="text"
        placeholder="Enter wallet address"
        formik={formik}
      />
      <Card.Footer>
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </Card.Footer>
    </Card>
  );
};

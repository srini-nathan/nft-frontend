import { FC } from "react";
import { Button } from "react-bootstrap";
import { InputWithValidation } from "../../form/InputWithValidation";

interface CreateAssetNFTFormProps {
  formik: any;
}

export const CreateAssetNFTForm: FC<CreateAssetNFTFormProps> = ({
  formik,
}: CreateAssetNFTFormProps) => {
  return (
    <>
      <div className="col-lg-4">
        <InputWithValidation
          label=""
          id="tokenPrice"
          type="text"
          placeholder="Enter Price in ETH"
          formik={formik}
        />
      </div>
      <div className="col-lg-12 mt-3">
        <div className="row">
          <div className="col-lg-6">
            <button  className="btn btn-primary w-100" type="submit">
              Create NFT Asset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

import { FC } from "react";

interface MintNFTFormProps {
  formik: any;
}

export const MintNFTForm: FC<MintNFTFormProps> = ({
  formik,
}: MintNFTFormProps) => {
  return (
    <>
      <div className="col-lg-4"></div>
      <div className="col-lg-12 mt-3">
        <div className="row">
          <div className="col-lg-6">
            <button className="btn btn-primary w-100" type="submit">
              Mint
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

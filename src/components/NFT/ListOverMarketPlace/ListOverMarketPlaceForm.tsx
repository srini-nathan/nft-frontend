import { FC } from "react";

interface ListOverMarketPlaceFormProps {
  formik: any;
}

export const ListOverMarketPlaceForm: FC<ListOverMarketPlaceFormProps> = ({
  formik,
}: ListOverMarketPlaceFormProps) => {
  return (
    <>
      <div className="col-lg-4"></div>
      <div className="col-lg-12 mt-3">
        <div className="row">
          <div className="col-lg-6">
            <button className="btn btn-primary w-100" type="submit">
              List for sale
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

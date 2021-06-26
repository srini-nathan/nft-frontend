import { FC } from "react";
import {Button} from 'react-bootstrap'

interface MakePatentFormProps {
  formik: any;
}

export const MakePatentForm: FC<MakePatentFormProps> = ({
  formik,
}: MakePatentFormProps) => {
  return (
    <>
      <div className="col-lg-4"></div>
      <div className="col-lg-12 mt-3">
        <div className="row">
          <div className="col-lg-6">
            <Button variant="dark" size="lg" type="submit">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

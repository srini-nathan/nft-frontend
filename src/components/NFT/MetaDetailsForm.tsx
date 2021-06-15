import react, { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../../components/form/InputWithValidation";

interface MetaDetailsFormProps {
  formik: any;
  formFile:File | null
}

export const MetaDetailsForm: FC<MetaDetailsFormProps> = ({
  formik,
  formFile
}: MetaDetailsFormProps) => {
  return (
    <Row className="mt-3">
      <Col
      lg={{ span: 6 }}
      md={{ span: 8 }}
      sm={{ span: 12 }}
      >
        <Card className="border-0">
          <Card.Body>
            <InputWithValidation
              label="Name"
              id="nftName"
              type="text"
              placeholder="Enter Name Of the Item"
              formik={formik}
            />
            <InputWithValidation
              label="Description"
              id="nftDescription"
              as="textarea"
              placeholder="Describe about the item"
              formik={formik}
            />
          </Card.Body>
          <Card.Footer className="border-0">
            <Button variant="primary" type="submit" disabled={!formFile}>
              Upload
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

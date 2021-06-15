import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../form/InputWithValidation";

interface PasswordResetFormProps {
  formik: any;
}

export const PasswordResetForm: FC<PasswordResetFormProps> = ({
  formik,
}: PasswordResetFormProps) => {
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <Card className="border-0">
          <Card.Body>
            <Card.Title as="h4">Reset Password</Card.Title>
            <InputWithValidation
              label="Current Password"
              id="currentPassword"
              type="password"
              placeholder="Enter Current Password"
              formik={formik}
            />
            <InputWithValidation
              label="New Password"
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              formik={formik}
            />
            <InputWithValidation
              label="Verify Password"
              id="verifyPassword"
              type="password"
              placeholder="Re-Enter new password"
              formik={formik}
            />
          </Card.Body>
          <Card.Footer className="border-0">
            <Button variant="primary" type="submit" block>
              Reset
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

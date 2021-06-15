import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../form/InputWithValidation";

interface InviteUserFormProps {
  formik: any;
}

export const InviteUserForm: FC<InviteUserFormProps> = ({
  formik,
}: InviteUserFormProps) => {
  return (
    <Row className="mt-5">
      <Col
        lg={{ span: 6, }}
        md={{ span: 8, }}
        sm={{ span: 12 }}
      >
        <Card className="border-0">
          <Card.Body>
            <Card.Title as="h4">Send Invitation</Card.Title>
            <InputWithValidation
              label="Email"
              id="email"
              type="email"
              placeholder="Enter Email"
              formik={formik}
            />
          </Card.Body>
          <Card.Footer className="border-0">
            <Button variant="primary" type="submit" block>
              Invite
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

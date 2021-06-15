import { Card, Col, Row } from "react-bootstrap";

export const EmailTemplate = ({ email }: { email: string }) => {
  return (
    <Row className="mt-5">
      <Col>
        <Card className="border-0">
          <Card.Body>
            <Card.Title as="h4">Email</Card.Title>
            {email}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

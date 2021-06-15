import { Col, Container, Modal, Row } from "react-bootstrap";
import React, { PropsWithChildren } from "react";

type Props = {
  show: boolean;
  name: string;
  onHide: () => void;
  className?: string;
};

export const ModalTemplate = ({
  show,
  name,
  onHide,
  children,
  className,
}: PropsWithChildren<Props>) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={false}
      className={className}
      aria-labelledby={name}
      data-testid={name}
    >
      <Modal.Header closeButton>
        <Modal.Title id={name} data-testid={`${name}-title`}>
          {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

ModalTemplate.Title = ({ title }: { title: string }) => (
  <div className="full-screen-modal__title">{title}</div>
);

ModalTemplate.Body = ({ children }: PropsWithChildren<{}>) => (
  <div className="full-screen-modal__body">{children}</div>
);

ModalTemplate.Controls = ({ children }: PropsWithChildren<{}>) => (
  <div className="full-screen-modal__controls">{children}</div>
);

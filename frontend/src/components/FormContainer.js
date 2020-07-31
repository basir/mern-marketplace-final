import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function FormContainer(props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

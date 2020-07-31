import React from 'react';
import { Nav } from 'react-bootstrap';

function CheckoutSteps(props) {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        {props.step1 ? (
          <Nav.Link>Signin</Nav.Link>
        ) : (
          <Nav.Link disabled>Signin</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <Nav.Link>Shipping</Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step3 ? (
          <Nav.Link>Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step4 ? (
          <Nav.Link>Place Order</Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;

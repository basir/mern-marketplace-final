import React from 'react';
import { Alert } from 'react-bootstrap';

export default function MessageBox(props) {
  return (
    <Alert className="my-3" variant={props.variant || 'info'}>
      {props.children}
    </Alert>
  );
}

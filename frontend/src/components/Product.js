import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h2">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text className="py-3" as="div">
          <Row>
            <Col> {product.brand}</Col>
            <Col className="text-right">
              <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}
              </Link>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text as="h2">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

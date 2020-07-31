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
          <Card.Title as="h5">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text className="my-2" as="div">
          <Row>
            <Col> {product.brand}</Col>
            <Col className="text-right">
              <Link
                to={`/seller/${product.seller.seller.name
                  .toLowerCase()
                  .replace(/ /g, '-')}`}
              >
                {product.seller.seller.name}
              </Link>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>

    // <div className="product">
    //   <Link to={'/product/' + product._id}>
    //     <img className="product-image" src={product.image} alt="product" />
    //   </Link>
    //   <div className="product-name">
    //     <Link to={'/product/' + product._id}>{product.name}</Link>
    //   </div>
    //   <div className="product-brand">{product.brand}</div>
    //   <div className="product-price">${product.price}</div>
    //   <div className="product-rating">
    //     <Rating value={product.rating} text={product.numReviews + ' reviews'} />
    //   </div>
    // </div>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { detailsUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function SellerScreen(props) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    products,
    error: errorProducts,
  } = productList;
  useEffect(() => {
    dispatch(detailsUser(props.match.params.id));
    dispatch(listProducts({ seller: props.match.params.id }));

    return () => {};
  }, []);

  return (
    <Row>
      <Col lg={3}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row className="align-items-center">
                <Col>
                  <Image src={user.seller.logo} fluid />
                </Col>
                <Col>
                  <h1>{user.seller.name}</h1>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={user.seller.rating}
                text={`${user.seller.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </ListGroupItem>
            <ListGroupItem>{user.seller.description}</ListGroupItem>
          </ListGroup>
        )}
      </Col>
      <Col lg={9}>
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox>{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>No Product Found.</MessageBox>
            )}
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}

export default SellerScreen;

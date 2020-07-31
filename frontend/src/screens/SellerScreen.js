import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Container,
  Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      <Col md={4}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ListGroup>
            <ListGroupItem>
              <Image src={user.seller.logo} fluid />
            </ListGroupItem>
            <ListGroupItem>
              <h2>{user.seller.name}</h2>
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
      <Col md={8}>
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox>{errorProducts}</MessageBox>
        ) : (
          <Container fluid>
            {products.length === 0 && (
              <MessageBox>No Product Found.</MessageBox>
            )}
            <Row>
              {products.map((product) => (
                <Col key={product._id} xs={12} md={6} className="py32">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default SellerScreen;

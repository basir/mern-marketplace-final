import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({ category }));

    return () => {
      //
    };
  }, [category]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Container fluid className="py-3">
          {products.length === 0 && <MessageBox>No Product Found.</MessageBox>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} md={4} className="py-2">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
export default HomeScreen;

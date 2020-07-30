import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

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
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Container fluid className="py-3">
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

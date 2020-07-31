import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : '';
  const searchKeyword = props.match.params.search
    ? props.match.params.search
    : '';

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({ category, searchKeyword }));

    return () => {
      //
    };
  }, [category, searchKeyword]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found.</MessageBox>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} md={4} className="py-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}
export default HomeScreen;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listTopSellers } from '../actions/userActions';

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : '';
  const searchKeyword = props.match.params.search
    ? props.match.params.search
    : '';

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const userTopSellers = useSelector((state) => state.userTopSellers);
  const { sellers, loading: loadingSellers } = userTopSellers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({ category, searchKeyword }));
    dispatch(listTopSellers());

    return () => {
      //
    };
  }, [category, searchKeyword]);

  return (
    <>
      {loading || loadingSellers ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <Carousel className="bg-dark">
            {sellers.map((user) => (
              <Carousel.Item key={user._id}>
                <Link className="seller-image" to={`/seller/${user._id}`}>
                  <Image
                    className="seller-image"
                    fluid
                    src={user.seller.logo}
                    alt={user.seller.name}
                  />

                  <Carousel.Caption>
                    <h2>{user.seller.name}</h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <h2 className="home-heading">Featured Products</h2>
          {products.length === 0 && <MessageBox>No Product Found.</MessageBox>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
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

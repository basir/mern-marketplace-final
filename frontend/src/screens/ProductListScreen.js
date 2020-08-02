import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants';

function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    dispatch({ type: PRODUCT_DETAILS_RESET });
    return () => {
      //
    };
  }, [successDelete, successCreate]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete this order?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <h1>Products</h1>
      <Button onClick={createHandler}>Create Product</Button>

      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    Edit
                  </Button>
                </LinkContainer>
                <Button
                  type="button"
                  className="btn-sm"
                  onClick={() => deleteHandler(product)}
                  variant="light"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default ProductListScreen;

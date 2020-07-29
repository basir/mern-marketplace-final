import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listProducts,
  deleteProdcut,
  createProduct,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants';

function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
    dispatch({ type: PRODUCT_DETAILS_RESET });
    return () => {
      //
    };
  }, [successDelete, successCreate]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete this order?')) {
      dispatch(deleteProdcut(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <h1>Products</h1>
      <Button onClick={createHandler}>Create Product</Button>

      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
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
    </div>
  );
}
export default ProductListScreen;

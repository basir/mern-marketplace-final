import React, { useState } from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import { signout } from './actions/userActions';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';

function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const handleSignout = () => {
    dispatch(signout());
    document.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand>MERN Marketplace</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-between"
            >
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    Cart{' '}
                    {cartItems.length > 0 && (
                      <Badge pill variant="danger">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="collasible-nav-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleSignout}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isSeller && (
                  <NavDropdown title="Seller" id="collasible-nav-dropdown">
                    <LinkContainer to="/orderlist/seller">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/productlist/seller">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="collasible-nav-dropdown">
                    <LinkContainer to="/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main>
          <Container className="py-3">
            <Route path="/userlist" component={UserListScreen} />
            <Route path="/orderlist/seller" component={OrderListScreen} />
            <Route path="/orderlist" component={OrderListScreen} exact />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/productlist/seller" component={ProductListScreen} />
            <Route path="/productlist" component={ProductListScreen} exact />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id/edit" component={ProductEditScreen} />
            <Route path="/seller/:id" component={SellerScreen} />
            <Route path="/user/:id/edit" component={UserEditScreen} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/search/:search" component={HomeScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Container>
        </main>
        <footer>
          <Row>
            <Col className="text-center py-3">© 2020 All right reserved.</Col>
          </Row>
        </footer>
      </>
    </BrowserRouter>
  );
}

export default App;

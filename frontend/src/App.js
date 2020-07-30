import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import { signout } from './actions/userActions';

function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleSignout = () => {
    dispatch(signout());
    document.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand>MERN Marketplace</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
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
          <Container>
            <Route path="/userlist" component={UserListScreen} />
            <Route path="/orderlist" component={OrderListScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/productlist/seller" component={ProductListScreen} />
            <Route path="/productlist" component={ProductListScreen} exact />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id/edit" component={ProductEditScreen} />
            <Route path="/user/:id/edit" component={UserEditScreen} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Container>
        </main>
        <footer>
          <div className="text-center py-3">© 2020 All right reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

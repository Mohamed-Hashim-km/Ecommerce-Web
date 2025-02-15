import { useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import SearchBox from "./SearchBox";

const Header = () => {
  // const [userInfo, setUserinfo] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    dispatch(clearCredentials());
    await logout().unwrap();
    dispatch(resetCart());
    navigate("/");
  };

  const profileHandler = () => {
    navigate("/profile");
  };
  console.log(userInfo);
  console.log(userInfo?.isAdmin);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <Nav.Link as={Link} to={"/cart"}>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo?.name ? (
                <NavDropdown title={userInfo.name} id="username" style={{ color: "white" }}>
                  <Nav.Link as={Link} to="/login">
                    <NavDropdown.Item onClick={profileHandler}>Profile</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler} type="Button">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser />
                  {userInfo && userInfo.name ? `${userInfo.name}` : "Sign In"}
                </Nav.Link>
              )}
              {userInfo && userInfo?.isAdmin && (
                <NavDropdown>
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

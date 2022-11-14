import { MDBBadge } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container, Form,
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../features/userSlice";

const Header = (props) => {
  
  const [currUser, setCurrUser] = useState({});
  const [cartLen, setCartLen] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrUser(props?.currUser)
    setCartLen(props.cartItems?.length)
  },[props.cartItems?.length, props?.currUser])


  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("userName")
    localStorage.removeItem("activeToken");
    setCurrUser({});
    dispatch(signOut());
    navigate("/login", { replace: true });
  };
  

  return (
    <Navbar
      className="d-flex container-fluid"
      bg="dark"
      variant="dark"
      sticky="top"
      expand="lg"
    >
      <Container className="d-flex justify-content-around container-fluid">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              All products
            </Nav.Link>
            {/* <NavDropdown title="Category" id="navbarScrollingDropdown">
              <DropdownButton
                variant="normal"
                drop="end"
                id="dropdown-basic-button"
                title="Motorcycle"
              >
                <Dropdown.Item href="#/action-1">Yamaha</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Pulser</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Walton</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                variant="normal"
                drop="end"
                id="dropdown-basic-button"
                title="Mobile"
              >
                <Dropdown.Item href="#/action-1">Samsung</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Xiaomi</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Apple</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Oppo</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                variant="normal"
                drop="end"
                id="dropdown-basic-button"
                title="Laptop"
              >
                <Dropdown.Item href="#/action-1">Asus</Dropdown.Item>
                <Dropdown.Item href="#/action-2">HP</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Dell</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                variant="normal"
                drop="end"
                id="dropdown-basic-button"
                title="Food"
              >
                <Dropdown.Item href="#/action-1">Burger</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Pizza</Dropdown.Item>
              </DropdownButton>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">All Category</NavDropdown.Item>
            </NavDropdown> */}
            {currUser.role === 'admin' && <NavDropdown title="Dashboard" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/users">
                Users
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/products">
                Products
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/add-product">
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/add-user">
                Add User
              </NavDropdown.Item>
            </NavDropdown>}
            {(currUser?.userName && currUser.role === 'user') && (
              <Nav.Link as={Link} to="/cart">
                Cart <MDBBadge className='ms-2' color='danger'>
        {cartLen}
      </MDBBadge>
              </Nav.Link>
            )}
            {currUser?.userName && (
                <NavDropdown
                  title="Orders"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to={`/${currUser.userName}/orders/packaging`}
                  >
                    Packaging Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/${currUser.userName}/orders/shipping`}>
                    Shipping Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/${currUser.userName}/orders/completed`}>
                    Completed Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={`/${currUser.userName}/orders/canceled`}>
                    Canceled Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
          </Nav>
          {/* <Form className="d-flex justify-content-around">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
            <Button variant="outline-success">Search</Button>
            <Nav
              className="me-auto ms-3 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {!(currUser?.userName) && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}

              {currUser?.userName && (
                <NavDropdown
                  title={currUser?.userName}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to={`/users/${currUser?.userName}`}
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    My Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} onClick={handleSignOut}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

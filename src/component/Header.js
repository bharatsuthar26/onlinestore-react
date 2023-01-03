import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { doLogout, isAdmin, isLoggedIn } from "../services/Data";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/">NeoStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!isLoggedIn() && (
              <>
                <Nav.Link to="" onClick={() => navigate("/")}>
                  Login
                </Nav.Link>
                <Nav.Link to="/regis" onClick={() => navigate("/regis")}>
                  SignUp
                </Nav.Link>
              </>
            )}
            {isLoggedIn() && (
              <>
                <Nav.Link to="/login" onClick={() => navigate("/products")}>
                  Products
                </Nav.Link>
                {isAdmin() && (
                  <>
                    <Nav.Link
                      to="/login"
                      onClick={() => navigate("/addproduct")}
                    >
                      Add Product
                    </Nav.Link>
                  </>
                )}
                <Nav.Link to="/cart" onClick={() => navigate("/cart")}>
                  Cart
                </Nav.Link>
                <Nav.Link onClick={() => doLogout()}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

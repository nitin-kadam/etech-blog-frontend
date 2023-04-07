/* eslint-disable */
import { useState, React, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/auth";

function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let user = getCurrentUser();
    console.log("user", user);
    if (user && user?._id) {
      setUser(user);
    } else {
      setUser(false);
    }
  }, []);

  const logOut = () => {
    logout();
  };

  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BlogPoint</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link eventKey={0}>
                <Link className="link" to={"/"}>
                  Home
                </Link>
              </Nav.Link>

              {user ? (
                <>
                  <Nav.Link eventKey={1}>
                    <Link className="link" to={"/myblogs"}>
                      My Blogs
                    </Link>
                  </Nav.Link>

                  <Nav.Link eventKey={4}>
                    <Link className="link" to={"/postblog"}>
                      New Post{" "}
                    </Link>
                  </Nav.Link>

                  <Nav.Link eventKey={5}>
                    <Link className="link" onClick={logOut}>
                      Log Out
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link eventKey={2}>
                    <Link className="link" to={"/login"}>
                      Login
                    </Link>
                  </Nav.Link>

                  <Nav.Link eventKey={3}>
                    <Link className="link" to={"/register"}>
                      Register
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

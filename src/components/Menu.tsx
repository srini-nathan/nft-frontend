import react from "react";
import { Navbar, Nav, Container, Button, NavLink } from "react-bootstrap";
// import logo from "../assets/casimir_logo.svg";
// import logo_text from "../assets/casimir_TextOnly.jpg";
import transparent_logo from "../assets/casimir_TransparentBg.png";
import { Link } from "react-router-dom";
import { JwtItem } from "../types/auth";

export const Menu = ({
  token,
  handleLogout,
}: {
  token: JwtItem | null;
  handleLogout: () => void;
}) => {
  return (
    <Navbar collapseOnSelect className="sticky-top">
      <Link to="/" className="navbar-brand">
        <img
          src={transparent_logo}
          width="120px"
          height="140px"
          className="d-inline-block align-top"
          alt=""
        />
      </Link>

      <Navbar.Toggle className="mr-2" aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="ml-auto mr-3">
          {/* <Link to="/dashboard" className="nav-link mx-3 text-dark">
            Dashboard
          </Link> */}

          {!token && !token ? (
            ""
          ) : (
            <>
            <Link to="/mynft" className="nav-link mx-3 text-dark">
                MyNFT
              </Link>

              <Link to="/profile" className="nav-link mx-3 text-dark">
                Profile
              </Link>

              <Nav.Link className="mx-3 text-dark" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

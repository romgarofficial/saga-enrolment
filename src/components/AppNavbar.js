import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import Logo from "../images/logo.png"
import { NavLink } from "react-router-dom";

export default function AppNavbar(){
    return(
    <Navbar bg="dark" sticky="top" data-bs-theme="dark" expand="lg" className="navbar nav-btm-border p-2 shadow nav-btm-border ">
      <Container className="container-fluid ">
            <Image src={Logo} as={ NavLink } to="/" className="nav-logo img-fluid nav-logo bg-light rounded-circle p-1 me-2"/>
            <Navbar.Brand as={ NavLink } to="/" className="nav-logo-name text-light d-none d-lg-inline-block"> St. Aloysius Gonzaga Academy, Inc</Navbar.Brand>
            <Navbar.Brand as={ NavLink } to="/" className="nav-logo-name text-light d-inline-block d-lg-none"> SAGA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={ NavLink } to="/">Home</Nav.Link>
            <Nav.Link as={ NavLink } to="/about">About</Nav.Link>
            <Button as={ NavLink } to="/enrollment" variant="outline-warning" className="mx-lg-2 mx-0 px-5">ENROLL</Button>
            <Button as={ NavLink } to="/login" variant="outline-primary" className="mx-lg-1 mx-0 px-5 mt-1 mt-lg-0">LOGIN</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

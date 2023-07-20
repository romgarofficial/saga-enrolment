import {Nav, Navbar, Container, Button, Image, NavDropdown} from "react-bootstrap"
import Logo from "../images/logo.png"
import { NavLink, Navigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

import { useContext } from "react"
import UserContext from "../UserContext";


export default function AppNavbar(){

  const { user } = useContext(UserContext);
  const userFullName = `${secureLocalStorage.getItem("firstName")} ${secureLocalStorage.getItem("middleName")} ${secureLocalStorage.getItem("lastName")}`
  console.log(userFullName);

  return (
    <Navbar bg="dark" sticky="top" data-bs-theme="dark" expand="lg" className="navbar nav-btm-border p-2 shadow nav-btm-border ">
      <Container className="container-fluid ">
        <Image src={Logo} as={NavLink} to="/" className="nav-logo img-fluid nav-logo bg-light rounded-circle p-1 me-2" />
        <Navbar.Brand as={NavLink} to="/" className="nav-logo-name text-light d-none d-lg-inline-block"> St. Aloysius Gonzaga Academy, Inc</Navbar.Brand>
        <Navbar.Brand as={NavLink} to="/" className="nav-logo-name text-light d-inline-block d-lg-none"> SAGA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              localStorage.length === 0 ?
                <>
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                  <Button as={NavLink} to="/enrolment" variant="outline-warning" className="mx-lg-2 mx-0 px-5">ENROL</Button>
                  <Button as={NavLink} to="/login" variant="outline-primary" className="mx-lg-1 mx-0 px-5 mt-1 mt-lg-0">LOGIN</Button>
                </>
                :
                <>
                  {secureLocalStorage.getItem("userType") === "ADMIN" ?
                    <>
                      <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                      <Nav.Link as={NavLink} to="/admission">Admission</Nav.Link>
                      <NavDropdown title="Assessment" id="navbarScrollingDropdown">
                        <NavDropdown.Item as={NavLink} to="/academic-assessment">Academic Assessment</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/financial-assessment">Financial Assessment</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={NavLink} to="/final-verification">Verification</Nav.Link>

                      <NavDropdown className="bg-secondary rounded px-2 fw-bold " title={<span className="text-warning">{userFullName}</span>} id="navbarScrollingDropdown">
                        <NavDropdown.Item as={NavLink} to="/profile">Profile Settings</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/tools">Tools</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
                      </NavDropdown>
                    </>
                    :
                    secureLocalStorage.getItem("userType") === "ADMISSION" ?
                      <>
                        <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/admission">Admission</Nav.Link>
                        <NavDropdown title="Assessment" id="navbarScrollingDropdown">
                          <NavDropdown.Item as={NavLink} to="/academic-assessment">Academic Assessment</NavDropdown.Item>
                          <NavDropdown.Item as={NavLink} to="/financial-assessment" className="d-none">Financial Assessment</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="bg-secondary rounded px-2 fw-bold " title={<span className="text-warning">{userFullName}</span>} id="navbarScrollingDropdown">
                          <NavDropdown.Item as={NavLink} to="/profile">Profile Settings</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                      </>
                      :
                      secureLocalStorage.getItem("userType") === "FINANCE" ?
                        <>
                          <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                          <NavDropdown title="Assessment" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={NavLink} to="/academic-assessment" className="d-none">Academic Assessment</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/financial-assessment">Financial Assessment</NavDropdown.Item>
                          </NavDropdown>
                          <NavDropdown className="bg-secondary rounded px-2 fw-bold " title={<span className="text-warning">{userFullName}</span>} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={NavLink} to="/profile">Profile Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
                          </NavDropdown>
                        </>
                        :
                        <>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <NavDropdown className="bg-secondary rounded px-2 fw-bold " title={<span className="text-warning">{userFullName}</span>} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={NavLink} to="/profile">Profile Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
                          </NavDropdown>
                        </>
                  }
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

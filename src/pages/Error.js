import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function Error(){
    useEffect(() => {
        document.title = 'SAGA - Page Not Found';
    })
    return(
        <>
            <Container fluid className="rounded vh-75 bg-lightgray text-center d-flex justify-content-center align-items-center flex-column">
                <h1 className="display-2 fw-bold">Uh, Oh!</h1>
                <p>The page you are trying to access cannot be found.</p>
                <Button variant="warning" as={NavLink} to={"/"} className="px-5">Home</Button>
            </Container>
        </>
    )
}

import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function Dashboard(){
    useEffect(() => {
        document.title = 'SAGA - Dashboard';
    })
    return(
        <>
            <Container fluid className="rounded vh-75 bg-lightgray text-center d-flex justify-content-center align-items-center flex-column">
                <h1 className="display-2 fw-bold">DASHBOARD</h1>
                <p>DASHBOARD</p>
                <Button variant="warning" as={NavLink} to={"/"} className="px-5">Home</Button>
            </Container>
        </>
    )
}

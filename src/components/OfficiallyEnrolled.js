import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import  secureLocalStorage  from  "react-secure-storage";

import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function OfficiallyEnrolled(){


    return(
        <Container fluid className="p-3 min-vh-75 bg-lightgray text-center d-flex justify-content-center align-items-center flex-column">
            <h1 className="fw-bold display-5 mb-4">OFFICIAL RECORDS</h1>
        </Container>
    )
}
import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import  secureLocalStorage  from  "react-secure-storage";
import OnlineEnrollment from "../components/OnlineEnrollment";
import OfficiallyEnrolled from "../components/OfficiallyEnrolled";

import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function Dashboard(){
    useEffect(() => {
        document.title = 'SAGA - Dashboard';
    })

    return(
            <>
            {
                localStorage.length !== 0 ?
                <>
                <OnlineEnrollment/>
                <OfficiallyEnrolled/>
                </>
                :
                <Navigate to={"/login"}/>
            }
           
        </>
    )
}

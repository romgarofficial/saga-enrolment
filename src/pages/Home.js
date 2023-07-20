import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"
import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

export default function Home(){

    useEffect(() => {
        document.title = 'SAGA - Home';
    })

    return(
        
            localStorage.length === 0 ?
            <>
            <Banner/>

            <Container fluid className="vh-75 bg-lightgray d-flex text-center justify-content-center align-items-center flex-column">
                <Image src={Logo} className="w-25 img-fluid rounded-circle bg-light mb-4 p-2"></Image>
                <h1 className="display-6 fw-bold ">ONLINE ENROLMENT SYSTEM</h1>
                <p>See you there, future Aloysians!</p>
            </Container>
        </>
        :
        <Navigate to={"/dashboard"}/>
        
        
    )
}

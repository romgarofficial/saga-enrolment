import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function Error(){
    useEffect(() => {
        document.title = 'SAGA - About';
    })
    return(
        <>
            <Container fluid className="rounded bg-lightgray text-center d-flex  p-lg-5 p-3">

                <Container fluid className="bg-light rounded p-3 p-lg-5">
                    <Container fluid className="border-2 border-bottom border-warning p-3">
                    <Image src={Logo} className="w-25 img-fluid rounded-circle bg-lightgray mb-4 p-2 border border-warning"></Image>
                        <h1 className="display-6 fw-bold">St. Aloysius Gonzaga Academy, Inc.</h1>
                        <p>Sto. Tomas, San Luis, Pampanga</p>
                    </Container>

                    <section className="my-5 d-flex text-start flex-column p-lg-5 p-3">
                    <p>Brief History of SAGA</p>

                    <p>The need to offer quality education services grew in the advent of the full implementation of Republic Act 10533 also known as the Enhanced Basic Education Act of 2013 or the K to 12 Curriculum. During that time, there was no private secondary school that could fully offer the academic track and strands. Many among the townsfolk expressed their worries since the nearest schools that could provide alternatives to the young people of San Luis are outside the town, So as early as 2013, people started to inform some concerned citizens about the dilemma.</p>

                    <p>Until they have finally reached for contacts the founding members of SAGSHS. After taking into consideration all the areas of concern, and after careful evaluation and deliberation of the merits of the different facets of the issue at hand the incorporators made a bold move to put up a stand-alone school that could provide more educational options to the young people of San Luis. </p>

                    <p>A stand-alone school is a branding for schools exclusively offering Senior High School only without other departments like Grade School, Junior High School and College.</p>

                    <p>After three years of successful operation, the clamor to offer additional courses by the stakeholders prompted the Board of incorporators to apply for other levels. </p>

                    <p>In the year 2018, SAGA applied for new courses to respond to the need to offer quality private education. In the year 2019, SAGA opened its Pre-School, Elementary School and Junior High School. Soon, the school will also offer Tertiary or College Programs to complete the Academic Courses from Basic to Higher Education.</p> 
                    </section>
                   
                    <Button variant="warning" as={NavLink} to={"/enrolment"} className="px-5 my-3">Enrol Now!</Button>
                </Container>

                
            </Container>
        </>
    )
}

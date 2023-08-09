import {Nav, Navbar, Container, Button, Image} from "react-bootstrap"
import { Navigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import  secureLocalStorage  from  "react-secure-storage";


export default function OnlineEnrollment(){

    useEffect(() => {
        finalVerification();
        getAdmissionApplication();
        getAssessment1Application();
        getAssessment2Application();
    })

    const [finalVerificationCount, setFinalVerificationCount] = useState(0);
    const [admissionCount, setAdmissionCount] = useState(0);
    const [ASCount, setASCount] = useState(0);
    const [FSCount, setFSCount] = useState(0);

    const finalVerification = (page) => {
        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/verification`, {
            headers: {
            "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFinalVerificationCount(data.length);
            });
        };

        const getAdmissionApplication = (page) => {

        
            fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/admission`, {
                headers: {
                "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setAdmissionCount(data.length);
                });
            };

            const getAssessment1Application = (page) => {
                fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/academic-assessment`, {
                    headers: {
                    "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setASCount(data.length)
            
                    });
                };

            const getAssessment2Application = (page) => {
                fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/financial-assessment`, {
                    headers: {
                    "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setFSCount(data.length)
            
                    });
                };

    return(
        <Container fluid className="p-3 min-vh-75 bg-lightgray text-center d-flex justify-content-center align-items-center flex-column">
                <h1 className="fw-bold display-5 mb-4">ONLINE ENROLLMENT</h1>
                    <Container className="row">
                        <Container className="col-lg-3 col-12 p-1">
                            <Container className="d-flex flex-column justify-content-center align-items-center border border-secondary shadow p-3 rounded-3">
                                    <h4>Total Applications for Admission</h4>
                                    <NavLink to="/admission" className="text-decoration-none">
                                    <h5 className="text-success fw-bold display-4">{admissionCount}</h5>
                                    </NavLink>
                            </Container>
                        </Container>

                        <Container className="col-lg-3 col-12 p-1">
                            <Container className="d-flex flex-column justify-content-center align-items-center border border-secondary shadow p-3 rounded-3">
                                    <h4>Total Applications for Academic Assessment</h4>
                                    <NavLink to="/academic-assessment" className="text-decoration-none">
                                    <h5 className="text-success fw-bold display-4">{ASCount}</h5>
                                    </NavLink>
                            </Container>
                        </Container>

                        <Container className="col-lg-3 col-12 p-1">
                            <Container className="d-flex flex-column justify-content-center align-items-center border border-secondary shadow p-3 rounded-3">
                                    <h4>Total Applications for Financial Assessment</h4>
                                    <NavLink to="/financial-assessment" className="text-decoration-none">
                                    <h5 className="text-success fw-bold display-4">{FSCount}</h5>
                                    </NavLink>
                            </Container>
                        </Container>

                        <Container className="col-lg-3 col-12 p-1">
                            <Container className="d-flex flex-column justify-content-center align-items-center border border-secondary shadow p-3 rounded-3">
                                <h4>Total Applications for Final Verification</h4>
                                <NavLink to="/final-verification" className="text-decoration-none">
                                <h5 className="text-success fw-bold display-4">{finalVerificationCount}</h5>
                                </NavLink>
                            </Container>
                        </Container>
                    </Container>
                </Container>
    )
}

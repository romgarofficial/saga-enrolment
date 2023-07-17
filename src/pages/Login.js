import {Col, Row, Container, Button, Image} from "react-bootstrap"
import {Box, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl} from '@mui/material';
import {InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import React from "react";
import Logo from "../images/logo.png"
import { useEffect } from "react";
import Banner from "../components/Banner.js"

export default function Enroll(){
    const formRef = React.useRef();

    useEffect(() => {
        document.title = 'SAGA - Login';
    })

    return(
        <>
        <Container fluid>
            <Row>
                <Col lg={6} sm={12} className="bg-lightgray d-flex justify-content-center align-items-center text-dark flex-column text-center shadow p-lg-5">
                    <Container fluid className="my-5 my-lg-0">
                        <Image src={Logo} className="w-50 img-fluid rounded-circle bg-light mb-4 p-2"></Image>
                        <h1 className="display-6 fw-bold">LOGIN TO YOUR ACCOUNT</h1>
                        <p>We never share your information to anyone else.</p>
                    </Container>
                </Col>
                <Col lg={6} sm={12} className="vh-100 bg-light justify-content-center align-items-center text-dark text-center shadow d-flex flex-column">
                <Box
                    ref={formRef}
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="p-lg-3 p-1 bg-light  bor w-lg-75 w-100 rounded px-lg-5 px-2 mt-3 mb-5 text-center"
                    >
                    <h1 className="my-4">LOGIN</h1>
                
                <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Email" variant="outlined" type="email" required />

                <TextField size="small"  className="my-1 w-100" id="outlined-basic" label="Password" variant="outlined" type="password" required/>

                <Button variant="outline-primary" className="w-100 mt-4" onClick={() => formRef.current.reportValidity()}>LOGIN</Button>
                </Box>
                </Col>
            </Row>
        </Container>
        </>
    )
}

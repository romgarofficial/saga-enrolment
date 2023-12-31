import {Col, Row, Container, Button, Image, Spinner} from "react-bootstrap"
import {Box, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl} from '@mui/material';
import Swal from "sweetalert2"
import React from "react";
import Logo from "../images/logo.png"
import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext.js";
import  secureLocalStorage  from  "react-secure-storage";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader.js";
import Banner from "../components/Banner.js"


export default function Enroll(){
    const formRef = React.useRef();

    const [isActive, setIsActive] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [buttonLoader, setButtonLoader] = useState(false);


    useEffect(() => {

        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);


    

    useEffect(() => {
        document.title = 'SAGA - Login';
    })


    function login(e) {
        e.preventDefault();

        setButtonLoader(true);
    
        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.accessToken);
    
            if (data.accessToken) {
                secureLocalStorage.setItem("token", data.accessToken);
                retrieveUserDetails(data.accessToken);
                setButtonLoader(false);
    
                Swal.fire({
                    title: "LOGIN SUCCESS!",
                    icon: "success",
                    text: "Welcome to SAGA Online Enrolment System!"
                });
    
                setEmail('');
                setPassword('');
            } else if (data === "2") {
                console.log(data);
                setButtonLoader(false);
                Swal.fire({
                    title: "EMAIL NOT RECOGNIZED",
                    icon: "error",
                    text: "Please contact the administrator about your account."
                });
            } else  {
                setButtonLoader(false);
                console.log(data);
                Swal.fire({
                    title: "LOGIN FAILED!",
                    icon: "error",
                    text: "Please check your login details and try again."
                });
            }
        });
    }

    const setUserDataToLocalStrage = (id, isAdmin, email, userType, fname, mname, lname) =>{
                secureLocalStorage.setItem("id", id);
                secureLocalStorage.setItem("isAdmin", isAdmin);
                secureLocalStorage.setItem("email", email);
                secureLocalStorage.setItem("userType", userType);
                secureLocalStorage.setItem("firstName", fname);
                secureLocalStorage.setItem("middleName", mname);
                secureLocalStorage.setItem("lastName", lname);
    }
    
    const retrieveUserDetails = (token) => {
    
    
        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/users/profile`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setUser({
                id: data.id,
                isAdmin: data.isAdmin,
                email:  data.email,
                userType: data.userType,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName
            });

            setUserDataToLocalStrage(data.id, data.isAdmin, data.email, data.userType, data.firstName, data.middleName, data.lastName);

        })
    }

    function GrowExample() {
        return <Spinner animation="grow" />;
      }

    const userType = secureLocalStorage.getItem("userType");
    const isLoggedIn = localStorage.length !== 0;

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    } else {

    return(
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
                        onSubmit={e => login(e)}
                        >
                        <h1 className="my-4">LOGIN</h1>
                    
                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Email" variant="outlined" type="email" value={email} required onChange={e => setEmail(e.target.value)} autoComplete='on'/>
    
                    <TextField size="small"  className="my-2 w-100" id="outlined-basic" label="Password" variant="outlined" type="password" value={password} required onChange={e => setPassword(e.target.value)}/>
    
                    {
                        isActive ?
                        <>
                        {
                            buttonLoader === false ?
                            <Button type="submit" variant="primary" className="w-100 mt-4" onClick={() => formRef.current.reportValidity()}>LOGIN</Button>
                            :
                            <Button disabled type="submit" variant="primary" className="w-100 mt-4" onClick={() => formRef.current.reportValidity()}><Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            LOADING...</Button>
                        }
                        </>
                        
                        :
                        <Button variant="outline-primary" className="w-100 mt-4" onClick={() => formRef.current.reportValidity()} disabled>LOGIN</Button>
                    }
                    
                    </Box>
                    </Col>
                </Row>
            </Container>
    )
    }
    
}

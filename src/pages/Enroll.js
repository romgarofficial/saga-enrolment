import {Col, Row, Container, Button, Image} from "react-bootstrap"
import {Box, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl} from '@mui/material';
import {InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import React from "react";
import Logo from "../images/logo.png";
import { useState, useEffect, navigate } from "react";
import Swal from "sweetalert2"
import Banner from "../components/Banner.js"

export default function Enroll(){
    const formRef = React.useRef();

    const [isKinder, setKinder] = useState(false);
    const [studentStatus, setStudentStatus] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [DOB, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
    const [strand, setStrand] = useState("");
    const [LRN, setLRN] = useState("");
    const [presentSchool, setPresentSchool] = useState("");
    const [parent, setParent] = useState("");
    const [parentNumber, setParentNumber] = useState("");
    const [selectGrade, setSelectGrade] = useState(12);
    console.log(parentNumber);

    useEffect(() => {
        if (selectGrade === 0) {
        setKinder(true);
        } else {
        setKinder(false);
        }
    }, [selectGrade]);

    useEffect(() => {
        document.title = 'SAGA - Enrollment';
    })

    function enroll(e){
        e.preventDefault();

        if(firstName === "" || middleName === "" || lastName === "" || middleName === "" || middleName === "" || middleName === "" || middleName === ""){

        }

        fetch("https://one-saga.onrender.com/enrollment/enroll",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentStatus: studentStatus,
                fullName: `${firstName, middleName, lastName}`,
                lrn: LRN,
                birthDate: DOB,
                address: address,
                mobileNumber: mobileNumber,
                socialAccount: socialMedia,
                gradeLevelToEnroll: selectGrade,
                strandToEnroll: strand,
                presentSchool: presentSchool,
                parentFullName: parent,
                parentMobileNumber: parentNumber,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data == "1"){
                Swal.fire({
                    title: "APPLICATION IS COMPLETE",
                    icon: "success",
                    text: "Please complete your enrollment at St. Aloysius Gonzaga Academy in Santo Tomas San Luis Pampanga."
                });
                // setFName('');
                // setLName('');
                // setEmail('');
                // setMobileNo('');
                // setPassword1('');
                // setPassword2('');
                // navigate("/home");
            }
            else if (data == "2"){

                Swal.fire({
                    title: "YOU ALREADY SUBMITTED AN APPLICATION",
                    icon: "error",
                    text: "Please complete your enrollment at St. Aloysius Gonzaga Academy in Santo Tomas San Luis Pampanga."
                });

            }else{

                Swal.fire({
                    title: "THERE IS A PROBLEM WITH YOUR APPLICATION",
                    icon: "error",
                    text: "Please try again later."
                });

            }
        })
    }


    return(
        <>
        <Container fluid>
            <Row>
                <Col lg={6} sm={12} className="bg-lightgray d-flex justify-content-center align-items-center text-dark flex-column text-center shadow p-lg-5">
                    <Container fluid className="my-5 my-lg-0">
                        <Image src={Logo} className="w-50 img-fluid rounded-circle bg-light mb-4 p-2"></Image>
                        <h1 className="display-6 fw-bold">START THE PROCESS HERE</h1>
                        <p>After this online registration, please proceed to St. Aloysius Gonzaga Academy, Inc. located at Santo Tomas, San Luis, Pampanga to complete the enrolment process.</p>
                    </Container>
                </Col>
                <Col lg={6} sm={12} className=" bg-light justify-content-center align-items-center text-dark text-center shadow">
                <h1 className="pt-3">Application Form</h1>
                <Box
                    ref={formRef}
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="p-lg-3 p-1 bg-light  bor w-lg-75 w-100 rounded px-lg-5 px-2 mt-3 mb-5 text-center"
                    onSubmit={e => enroll(e)}
                    >

                    <FormControl ref={formRef} className="w-100">
                    <FormLabel id="demo-radio-buttons-group-label" className="w-100 text-start">Student Status</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="new"
                            name="radio-buttons-group"
                            className="d-flex flex-lg-row flex-column w-100"
                            size="small"
                            onChange={e => setStudentStatus(e.target.value)}
                        >
                            <FormControlLabel size="small"  value="new" control={<Radio />} label="New" />
                            <FormControlLabel size="small"  value="old" control={<Radio />} label="Old" />
                            <FormControlLabel size="small"  value="transferee" control={<Radio />} label="Transferee" />
                        </RadioGroup>
                    </FormControl>

                    <TextField size="small" className="my-1 w-100" id="outlined-basic" label="First Name" variant="outlined" type="text" required onChange={e => setFirstName(e.target.value)}/>

                    <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Middle Name" variant="outlined" type="text" required onChange={e => setMiddleName(e.target.value)}/>

                    <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Last Name" variant="outlined" type="text" required onChange={e => setLastName(e.target.value)}/>
                    
                    <label className="w-100 text-start">Date of Birth</label>
                    <TextField size="small"  className="my-1 w-100" id="outlined-basic" variant="outlined" type="date" required onChange={e => setDOB(e.target.value)}/>

                    <TextField size="small"  className="my-1 w-100" id="outlined-basic" label="Complete Address" variant="outlined" type="text" required onChange={e => setAddress(e.target.value)}/>

                    <TextField size="small"  className="my-1 w-100" id="outlined-basic" label="Mobile Number Ex. 09123456789" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" required onChange={e => setMobileNumber(e.target.value)}/>

                    <TextField size="small"  className="my-1 w-100" id="outlined-basic" label="Name on Social Media Like FB/Messenger" variant="outlined" type="text" required onChange={e => setSocialMedia(e.target.value)}/>

                <FormControl className="w-100 my-1">
                    
                    <InputLabel id="demo-simple-select-helper-label">Grade Level</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Grade Level"
                    required
                    onChange={e => setSelectGrade(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Kinder</MenuItem>
                    <MenuItem value={1}>Grade 1</MenuItem>
                    <MenuItem value={2}>Grade 2</MenuItem>
                    <MenuItem value={3}>Grade 3</MenuItem>
                    <MenuItem value={4}>Grade 4</MenuItem>
                    <MenuItem value={5}>Grade 5</MenuItem>
                    <MenuItem value={6}>Grade 6</MenuItem>
                    <MenuItem value={7}>Grade 7</MenuItem>
                    <MenuItem value={8}>Grade 8</MenuItem>
                    <MenuItem value={9}>Grade 9</MenuItem>
                    <MenuItem value={10}>Grade 10</MenuItem>
                    <MenuItem value={11}>Grade 11</MenuItem>
                    <MenuItem value={12}>Grade 12</MenuItem>
                    </Select>
                </FormControl>

                {
                    isKinder ?
                    <>
                    <FormControl className="w-100 my-1 d-none">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    required
                    
                    >

                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>STEM</MenuItem>
                    <MenuItem value={1}>HUMSS</MenuItem>
                    <MenuItem value={2}>ABM</MenuItem>
                    </Select>
                </FormControl>

                <TextField size="small"  className="my-1 w-100 d-none" id="outlined-basic" label="Learner's Reference Number (LRN)" variant="outlined" type="text" />
                </>
                :
                <>
                    {
                        selectGrade > 10 ?
                <FormControl className="w-100 my-1">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    required
                    onChange={e => setStrand(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"stem"}>STEM</MenuItem>
                    <MenuItem value={"humss"}>HUMSS</MenuItem>
                    <MenuItem value={"abm"}>ABM</MenuItem>
                    </Select>
                </FormControl>
                :
                <FormControl className="w-100 my-1 d-none">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    required
                    
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>STEM</MenuItem>
                    <MenuItem value={1}>HUMSS</MenuItem>
                    <MenuItem value={2}>ABM</MenuItem>
                    </Select>
                </FormControl>
                    }

                <TextField size="small"  className="my-1 w-100" id="outlined-basic" label="Learner's Reference Number (LRN)" variant="outlined" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={e => setLRN(e.target.value)}/>
                </>
                }

                <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Present School" variant="outlined" type="text" required onChange={e => setPresentSchool(e.target.value)}/>

                <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Parent/Guardian Full Name" variant="outlined" type="text" required onChange={e => setParent(e.target.value)}/>

                <TextField size="small" className="my-1 w-100" id="outlined-basic" label="Parent/Guardian Mobile Number" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" required onChange={e => setParentNumber(e.target.value)}/>

                <Button variant="outline-dark" className="w-100 mt-4" type="submit" onClick={() => formRef.current.reportValidity()}>SUBMIT</Button>

                </Box>
                </Col>
            </Row>
        </Container>
        </>
    )
}

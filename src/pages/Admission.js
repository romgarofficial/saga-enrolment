import {ButtonGroup, Table, Container, Button, Modal, Col, Row} from "react-bootstrap"
import  secureLocalStorage  from  "react-secure-storage";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsPersonFillAdd, BsArrowClockwise } from "react-icons/bs";

import {Box, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl,Pagination, Stack} from '@mui/material';
import {InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Swal from "sweetalert2"
import React from "react";

import Logo from "../images/logo.png"
import Banner from "../components/Banner.js"

export default function Admission(){
    const formRef = React.useRef();

    const [isKinder, setKinder] = useState(false);

    const [allAdmission, setAllAdmission] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [viewModal, setViewModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [enrollStudentModal, setEnrollStudentModal] = useState(false);
    const [applicationDataNotEmpty, setApplicationNotEmpty] = useState(false);

    const closeViewModal = () => {
        setViewModal(false);
    };

    const closeEnrollStudentModal = () => {
        setEnrollStudentModal(false);
    };

    const openEnrolStudentModal = () => {
        setEnrollStudentModal(true);
    };

    const closeApproveModal = () => {
        setApproveModal(false);
    };

    


    const [applicationId, setApplicationId] = useState("");
    const [status, setStatus] = useState("");
    const [studentStatus, setStudentStatus] = useState("NEW");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("none");
    const [DOB, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
    const [strand, setStrand] = useState("");
    const [LRN, setLRN] = useState("");
    const [presentSchool, setPresentSchool] = useState("");
    const [parent, setParent] = useState("");
    const [parentNumber, setParentNumber] = useState("");
    const [medicalCondition, setMedicalCondition] = useState("");
    const [selectGrade, setSelectGrade] = useState("");
    const [enrolledOn, setEnrolledOn] = useState("");

    const [status_e, setStatus_e] = useState("");
    const [firstName_e, setFirstName_e] = useState("");
    const [middleName_e, setMiddleName_e] = useState("");
    const [lastName_e, setLastName_e] = useState("");
    const [fullName_e, setFullName_e] = useState("");
    const [email_e, setEmail_e] = useState("none");
    const [DOB_e, setDOB_e] = useState("");
    const [address_e, setAddress_e] = useState("");
    const [mobileNumber_e, setMobileNumber_e] = useState("");
    const [socialMedia_e, setSocialMedia_e] = useState("");
    const [strand_e, setStrand_e] = useState("");
    const [LRN_e, setLRN_e] = useState("");
    const [presentSchool_e, setPresentSchool_e] = useState("");
    const [parent_e, setParent_e] = useState("");
    const [parentNumber_e, setParentNumber_e] = useState("");
    const [medicalCondition_e, setMedicalCondition_e] = useState("");
    const [selectGrade_e, setSelectGrade_e] = useState("");
    const [isKinder_e, setKinder_e] = useState(false);

    const rowsPerPage = 10;

    const refreshAdmissionData = () => {
        getAdmissionApplication(currentPage);
      };


    useEffect(() => {
        document.title = 'SAGA - Admission';
        getAdmissionApplication(currentPage);
      }, [currentPage]);


      useEffect(() => {
        if (selectGrade_e === 0) {
        setKinder_e(true);
        } else {
        setKinder_e(false);
        }
    }, [selectGrade_e]);



const getAdmissionApplication = (page) => {
    fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/admission`, {
        headers: {
        "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        setAllAdmission(data.reverse());
        setTotalPages(Math.ceil(data.length / rowsPerPage));
        console.log(data);

        if(data.length !== 0){
            setApplicationNotEmpty(true);
        }else{
            setApplicationNotEmpty(false);
        }
        

        });
    };

    const approveApplication = (id) => {
        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/admission/${id}`, {

                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
    
            },
            body: JSON.stringify({
                isDoneAdmission: true
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                
    
                if(data == "1"){
                    Swal.fire({
                        title: "APPLICATION APPROVED!",
                        icon: "success",
                        text: `${firstName} ${middleName} ${lastName} is now ready for Academic Assessment.`
                    });
    
                    getAdmissionApplication();
                    closeApproveModal();
                }else if(data == "2"){
                    Swal.fire({
                        title: "APPLICATION ERROR!",
                        icon: "success",
                        text: `${firstName} ${middleName} ${lastName}'s application is already approved.`
                    });
    
                    getAdmissionApplication();
                }else{
                    Swal.fire({
                        title: "APPLICATION ERROR!",
                        icon: "error",
                        text: "Something went wrong. Please try again later"
                    })
                }
            })
    };
    
      const renderTableRows = () => {
        if (!allAdmission || allAdmission.length === 0) {
            console.log("error")
            return null; 
        }

            
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
        
            return allAdmission.slice(startIndex, endIndex).map((admission, index) => (
                <tr key={admission._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{`${admission.firstName} ${admission.middleName} ${admission.lastName}`}</td>
                    <td>{admission.lrn}</td>
                    <td>{admission.gradeLevelToEnroll}</td>
                    <td>{admission.strandToEnroll}</td>
                    <td>{admission.mobileNumber}</td>
                    <td>{admission.studentStatus}</td>
                    <td className="text-center">
                        <ButtonGroup>
                            <Button variant="primary" size="sm" onClick={() => openViewModal(admission._id)}>View</Button>
                            <Button variant="success" size="sm" onClick={() => openApproveModal(admission._id)}>Approve</Button>
                            <Button variant="danger" size="sm">Archive</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ));
        

    };
    
    const openViewModal = (id) => {
        setApplicationId(id);

        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/admission/${id}`)
            .then(res => res.json())
            .then(data => {
                
                setApplicationId(data._id);
                setStatus(data.studentStatus);
                setFirstName(data.firstName);
                setMiddleName(data.middleName);
                setLastName(data.lastName);
                setDOB(data.birthDate);
                setAddress(data.address);
                setMobileNumber(data.mobileNumber);
                setSocialMedia(data.socialAccount);
                setStrand(data.strandToEnroll);
                setLRN(data.lrn);
                setPresentSchool(data.presentSchool);
                setParent(data.parentFullName);
                setParentNumber(data.parentMobileNumber);
                setMedicalCondition(data.medicalCondition);
                setSelectGrade(data.gradeLevelToEnroll);
                setMedicalCondition(data.medicalCondition);
                setEnrolledOn(data.createdOn);

                
            });

        setViewModal(true)
        
    };


    const openApproveModal = (id) => {
        setApplicationId(id);

        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/admission/${id}`)
            .then(res => res.json())
            .then(data => {
                
                setApplicationId(data._id);
                setStatus(data.studentStatus);
                setFirstName(data.firstName);
                setMiddleName(data.middleName);
                setLastName(data.lastName);
                setDOB(data.birthDate);
                setAddress(data.address);
                setMobileNumber(data.mobileNumber);
                setSocialMedia(data.socialAccount);
                setStrand(data.strandToEnroll);
                setLRN(data.lrn);
                setPresentSchool(data.presentSchool);
                setParent(data.parentFullName);
                setParentNumber(data.parentMobileNumber);
                setMedicalCondition(data.medicalCondition);
                setSelectGrade(data.gradeLevelToEnroll);
                setMedicalCondition(data.medicalCondition);
                setEnrolledOn(data.createdOn);

                
            });

        setApproveModal(true)
        
    };

    function enroll(e){
        e.preventDefault();

        if(firstName_e === "" || lastName_e === "" || DOB_e === "" || address_e === "" || mobileNumber_e === "" || socialMedia_e === "" || presentSchool_e === "" || parent_e === "" || parentNumber_e === "" || selectGrade_e === ""){
        
            Swal.fire({
                title: "PLEASE FILL ALL REQUIRED FIELDS",
                icon: "error",
                text: "We never share your information to anyone else."
            });
        
        }else{

            fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/enroll`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentStatus: status_e,
                firstName: firstName_e,
                middleName: middleName_e,
                lastName: lastName_e,
                lrn: LRN_e,
                birthDate: DOB_e,
                address: address_e,
                mobileNumber: mobileNumber_e,
                socialAccount: socialMedia_e,
                gradeLevelToEnroll: "GRADE " + selectGrade_e,
                strandToEnroll: strand_e,
                presentSchool: presentSchool_e,
                medicalCondition: medicalCondition_e,
                parentFullName: parent_e,
                parentMobileNumber: parentNumber_e,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data == "1"){
                Swal.fire({
                    title: "APPLICATION IS COMPLETE",
                    icon: "success",
                    text: "Please check the list of enrolled student."
                });
                setKinder_e(false);
                setStatus_e("NEW");
                setFirstName_e("");
                setMiddleName_e("");
                setLastName_e("");
                setFullName_e("");
                setDOB_e("");
                setAddress_e("");
                setMobileNumber_e("");
                setSocialMedia_e("");
                setStrand_e("");
                setLRN_e("");
                setPresentSchool_e("");
                setParent_e("");
                setParentNumber_e("");
                setMedicalCondition_e("");
                setSelectGrade_e("");

                getAdmissionApplication();
            }
            else if (data == "2"){

                Swal.fire({
                    title: "THIS STUDENT IS ALREADY ENROLED",
                    icon: "error",
                    text: "Please check the list of enrolled student."
                });

            }else{

                Swal.fire({
                    title: "THERE IS A PROBLEM WITH THE APPLICATION",
                    icon: "error",
                    text: "Please try again later."
                });

            }
        })


        }

    }


    return(
        <>
       
        {
            localStorage.length === 0 ?
            <Navigate to={"/login"}/>
            :
            <Container fluid className="d-flex bg-lightgray flex-wrap p-2 p-lg-2 flex-wrap">
                <h1 className="display-5 fw-bold ms-5 my-2">ADMISSION</h1>
                    <Container className=" bg-light d-flex flex-column p-1 p-lg-3 rounded shadow my-4 min-vh-100">
                    <h4 className="m-2">TOOLS</h4>
                    <Container fluid className="d-flex flex-column flex-lg-row ">
                        <Button clas variant="success"  className="px-5 mx-0 mx-lg-0 my-2 my-lg-3 me-0 me-lg-2" onClick={() => openEnrolStudentModal()}><BsPersonFillAdd size={20} className="p-0 m-0 mx-2" />Enroll</Button>
                        <Button clas variant="warning"  className="px-5 mx-0 mx-lg-0 my-2 my-lg-3" onClick={() => getAdmissionApplication()}> <BsArrowClockwise size={20} className="p-0 m-0 mx-2" />Refresh</Button>
                    </Container>

                    <Container condensed fluid className="d-flex flex-wrap  flex-lg-row my-3 overflow-x-auto ">
                    {
                        applicationDataNotEmpty === false ?

                    <>
                        <Container fluid className="p-3 d-flex justify-content-center align-items-center vh-75">
                            <h1 className="display-6 fw-bold">There is no new application.</h1>
                        </Container>
                    </>
                    :
                    <>
                    <Table striped bordered hover className="table-secondary">
                        <thead className=" text-warning">
                            <tr >
                            <th className="bg-dark text-light">#</th>
                            <th className="bg-dark text-light">Full Name</th>
                            <th className="bg-dark text-light">LRN</th>
                            <th className="bg-dark text-light">Grade</th>
                            <th className="bg-dark text-light">Strand</th>
                            <th className="bg-dark text-light">Mobile Number</th>
                            <th className="bg-dark text-light">Status</th>
                            <th className="bg-dark text-light">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </Table>

                    <Container className="d-flex justify-content-center">
                    <Pagination
                        count={totalPages}
                        shape="rounded"
                        color="primary"
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                    />
                    </Container>
                    </>
                    }
                    

                    </Container>

                    
                    </Container>
            </Container>
        }
        

        {/* VIEW MODAL */}
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={viewModal}
        >
        <Modal.Header className="bg-warning text-dark">
            <Modal.Title id="contained-modal-title-vcenter fw-bold">
            {`${firstName} ${middleName} ${lastName}`}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
            <Container fluid className="d-flex flex-column align-items-center mx-2 w-100">
                <Row>
                    <Col lg={4} sm={12}>
                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="First Name" variant="outlined" type="text" value={firstName} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Middle Name" variant="outlined" type="text" value={middleName} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Last Name" variant="outlined" type="text" value={lastName} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="LRN" variant="outlined" type="number" value={LRN} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Email" variant="outlined" type="text" value={email} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Date of Birth" variant="outlined" type="text" value={DOB} />
                    </Col>

                    <Col lg={4} sm={12}>
                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Home Address" variant="outlined" type="text" value={address} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Mobile Number" variant="outlined" type="number" value={mobileNumber} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Social Media Name" variant="outlined" type="text" value={socialMedia} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Grade Level to Enroll" variant="outlined" type="text" value={selectGrade} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Strand" variant="outlined" type="text" value={strand} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Previous School" variant="outlined" type="text" value={presentSchool} />
                    </Col>

                    <Col lg={4} sm={12}>
                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Student Status" variant="outlined" type="text" value={status} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Parent/Guardian Name" variant="outlined" type="text" value={parent} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Parent/Guardian Mobile Number" variant="outlined" type="number" value={parentNumber} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Medical Condition" variant="outlined" type="text" value={medicalCondition} />

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Date of Online Enrolment" variant="outlined" type="text" value={enrolledOn} />

                    </Col>

                </Row>
                
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success px-4" onClick={() => openApproveModal(applicationId)}>APPROVE</Button>
            <Button variant="danger px-4" onClick={closeViewModal}>Close</Button>
        </Modal.Footer>
        </Modal>


        {/* ADD ENROLL MODAL */}
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={enrollStudentModal}
        >
        <Modal.Header className="bg-warning text-dark">
            <Modal.Title id="contained-modal-title-vcenter fw-bold">
            ENROLL STUDENT
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid className="d-flex flex-column align-items-center mx-2 w-100">
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
                            defaultValue="NEW"
                            name="radio-buttons-group"
                            className="d-flex flex-lg-row flex-column w-100"
                            size="small"
                            onChange={e => setStatus_e(e.target.value.toUpperCase())}
                        >
                            <FormControlLabel size="small"  value="NEW" control={<Radio />} label="New" />
                            <FormControlLabel size="small"  value="OLD" control={<Radio />} label="Old" />
                            <FormControlLabel size="small"  value="TRANSFEREE" control={<Radio />} label="Transferee" />
                        </RadioGroup>
                    </FormControl>

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="First Name" variant="outlined" value={firstName_e} type="text" required onChange={e => setFirstName_e(e.target.value.toUpperCase())}/>

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Middle Name" variant="outlined" value={middleName_e} type="text"  onChange={e => setMiddleName_e(e.target.value.toUpperCase())}/>

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Last Name" variant="outlined" type="text" required value={lastName_e} onChange={e => setLastName_e(e.target.value.toUpperCase())}/>
                    
                    <label className="w-100 text-start">Date of Birth</label>
                    <TextField size="small" value={DOB_e}  className="my-2 w-100" id="outlined-basic" variant="outlined" type="date" required onChange={e => setDOB_e(e.target.value.toUpperCase())}/>

                    <TextField size="small"  className="my-2 w-100" id="outlined-basic" label="Complete Address" variant="outlined" type="text" value={address_e} required onChange={e => setAddress_e(e.target.value.toUpperCase())}/>

                    <TextField size="small"  className="my-2 w-100" id="outlined-basic" label="Mobile Number Ex. 09123456789" variant="outlined" value={mobileNumber_e} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" required onChange={e => setMobileNumber_e(e.target.value.toUpperCase())}/>

                    <TextField size="small"  className="my-2 w-100" id="outlined-basic" label="Name on Social Media Like FB/Messenger" variant="outlined" type="text" value={socialMedia_e} required onChange={e => setSocialMedia_e(e.target.value.toUpperCase())}/>

                    <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Medical Condition Ex. Asthma, Visually Impared, and others" value={medicalCondition_e} variant="outlined" type="text" onChange={e => setMedicalCondition_e(e.target.value.toUpperCase())}/>

                <FormControl className="w-100 my-1">
                    
                    <InputLabel id="demo-simple-select-helper-label">Grade Level</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Grade Level"
                    required
                    onChange={e => setSelectGrade_e(e.target.value)}
                    value={selectGrade_e}
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
                    isKinder_e ?
                    <>
                    <FormControl className="w-100 my-1 d-none">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    value={strand_e}
                    >

                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"STEM"}>STEM</MenuItem>
                    <MenuItem value={"HUMSS"}>HUMSS</MenuItem>
                    <MenuItem value={"ABM"}>ABM</MenuItem>
                    </Select>
                </FormControl>

                <TextField size="small"  className="my-2 w-100 d-none" id="outlined-basic" label="Learner's Reference Number (LRN)" variant="outlined" value={LRN_e} onChange={e => setLRN_e(e.target.value.toUpperCase())} type="text" />
                </>
                :
                <>
                    {
                        selectGrade_e > 10 ?
                <FormControl className="w-100 my-1">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    onChange={e => setStrand_e(e.target.value.toUpperCase())}
                    value={strand_e}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"STEM"}>STEM</MenuItem>
                    <MenuItem value={"HUMSS"}>HUMSS</MenuItem>
                    <MenuItem value={"ABM"}>ABM</MenuItem>
                    </Select>
                </FormControl>
                :
                <FormControl className="w-100 my-1 d-none">
                    <InputLabel id="demo-simple-select-helper-label">Select Strand</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Strand"
                    value={strand_e}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"STEM"}>STEM</MenuItem>
                    <MenuItem value={"HUMSS"}>HUMSS</MenuItem>
                    <MenuItem value={"ABM"}>ABM</MenuItem>
                    </Select>
                </FormControl>
                    }

                <TextField size="small"  className="my-2 w-100" id="outlined-basic" label="Learner's Reference Number (LRN)" variant="outlined" type="number" value={LRN_e} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={e => setLRN_e(e.target.value.toUpperCase())}/>
                </>
                }

                <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Present School" variant="outlined" type="text" value={presentSchool_e} required onChange={e => setPresentSchool_e(e.target.value.toUpperCase())}/>

                <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Parent/Guardian Full Name" variant="outlined" type="text" value={parent_e} required onChange={e => setParent_e(e.target.value.toUpperCase())}/>

                <TextField size="small" className="my-2 w-100" id="outlined-basic" label="Parent/Guardian Mobile Number" variant="outlined" value={parentNumber_e} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} type="number" required onChange={e => setParentNumber_e(e.target.value.toUpperCase())}/>


                <Button variant="outline-dark" className="w-100 mt-4" type="submit" onClick={() => formRef.current.reportValidity()}>SUBMIT</Button>

                </Box>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger px-4" onClick={closeEnrollStudentModal}>Close</Button>
        </Modal.Footer>
        </Modal>



        {/* Confirm approve application modal */}

        <Modal centered show={approveModal} onShow={closeViewModal}>
            <Modal.Header className="bg-warning">
            <Modal.Title>CONFIRM APPROVAL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Approve ${firstName} ${middleName} ${lastName}'s application?`}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeApproveModal}>
                Close
            </Button>
            <Button variant="success" onClick={() => approveApplication(applicationId)} >
                APRROVE
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}


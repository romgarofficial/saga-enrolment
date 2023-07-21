import {ButtonGroup, Table, Container, Button, Modal, Col, Row} from "react-bootstrap"
import  secureLocalStorage  from  "react-secure-storage";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsPersonFillAdd, BsArrowClockwise } from "react-icons/bs";

import {Box, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl,Pagination, Stack} from '@mui/material';
import {InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Swal from "sweetalert2"
import React from "react";


export default function AcademicAssessment(){
    const formRef = React.useRef();


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

    const rowsPerPage = 10;

    const refreshAcademicAssessment = () => {
        getAssessment1Application(currentPage);
      };


    useEffect(() => {
        document.title = 'SAGA - Academic Assessment';
        getAssessment1Application(currentPage);
      }, [currentPage]);


const getAssessment1Application = (page) => {
    fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/academic-assessment`, {
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
        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/academic-assessment/${id}`, {

                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${secureLocalStorage.getItem("token")}`
    
            },
            body: JSON.stringify({
                isDoneAssessment1: true
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                
    
                if(data == "1"){
                    Swal.fire({
                        title: "APPLICATION APPROVED!",
                        icon: "success",
                        text: `${firstName} ${middleName} ${lastName} is now ready for Financial Assessment.`
                    });
    
                    getAssessment1Application();
                    closeApproveModal();
                }else if(data == "2"){
                    Swal.fire({
                        title: "APPLICATION ERROR!",
                        icon: "success",
                        text: `${firstName} ${middleName} ${lastName}'s application is already approved.`
                    });
    
                    getAssessment1Application();
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
        
            return allAdmission.slice(startIndex, endIndex).map((assessment1, index) => (
                <tr key={assessment1._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{`${assessment1.firstName} ${assessment1.middleName} ${assessment1.lastName}`}</td>
                    <td>{assessment1.lrn}</td>
                    <td>{assessment1.gradeLevelToEnroll}</td>
                    <td>{assessment1.strandToEnroll}</td>
                    <td>{assessment1.mobileNumber}</td>
                    <td>{assessment1.studentStatus}</td>
                    <td className="text-center">
                        <ButtonGroup>
                            <Button variant="primary" size="sm" onClick={() => openViewModal(assessment1._id)}>View</Button>
                            <Button variant="success" size="sm" onClick={() => openApproveModal(assessment1._id)}>Approve</Button>
                            <Button variant="danger" size="sm">Archive</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ));
        

    };
    
    const openViewModal = (id) => {
        setApplicationId(id);

        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/academic-assessment/${id}`)
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

        fetch(`${process.env.REACT_APP_ONE_SAGA_URL}/enrollment/academic-assessment/${id}`)
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



    return(
        <>
       
        {
            localStorage.length === 0 ?
            <Navigate to={"/login"}/>
            :
            <Container fluid className="d-flex bg-lightgray flex-wrap p-2 p-lg-2 flex-wrap">
                <h1 className="display-5 fw-bold ms-5 my-2">ACADEMIC ASSESSMENT</h1>
                    <Container className=" bg-light d-flex flex-column p-1 p-lg-3 rounded shadow my-4 min-vh-100">
                    <h4 className="m-2">TOOLS</h4>
                    <Container fluid className="d-flex flex-column flex-lg-row ">
                        <Button clas variant="warning"  className="px-5 mx-0 mx-lg-0 my-2 my-lg-3" onClick={() => getAssessment1Application()}> <BsArrowClockwise size={20} className="p-0 m-0 mx-2" />Refresh</Button>
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


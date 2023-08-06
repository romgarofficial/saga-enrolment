import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer.js";
import { UserProvider } from "./UserContext";
import {useState, useEffect} from "react"

import Home from "./pages/Home.js";
import Enroll from "./pages/Enroll.js";
import Error from "./pages/Error.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import Dashboard from "./pages/Dashboard.js";
import Admission from "./pages/Admission.js";
import AcademicAssessment from "./pages/AcademicAssessment.js";
import FinancialAssessment from "./pages/FinancialAssessment.js";
import Verification from "./pages/Verification.js";
import About from "./pages/About.js";
import { Navigate } from "react-router-dom";



function App() {


  const [user, setUser] = useState({
      id: null,
			isAdmin: null,
      email: null,
      userType: null,
      firstName: null,
      middleName: null,
      lastName: null
  });

  const unsetUser = () =>{
    localStorage.clear(); 
  }

  console.log(user);

  useEffect(() =>{
    if(localStorage.length === 0){
      <Navigate to="/logout"/>
    }
  })




  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container fluid className='p-0 m-0 d-flex flex-column'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/enrolment" element={<Enroll />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/admission" element={<Admission />} />
            <Route exact path="/academic-assessment" element={<AcademicAssessment />} />
            <Route exact path="/financial-assessment" element={<FinancialAssessment />} />
            <Route exact path="/final-verification" element={<Verification />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Container>
        </Router>
        
    </UserProvider>
  );
}

export default App;

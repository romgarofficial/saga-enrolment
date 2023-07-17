import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer.js";
import { UserProvider } from "./UserContext";
import {useState} from "react"

import Home from "./pages/Home.js";
import Enroll from "./pages/Enroll.js";
import Error from "./pages/Error.js";
import Login from "./pages/Login.js";



function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () =>{
    localStorage.clear(); 
  }




  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container fluid className='p-0 m-0'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/enrollment" element={<Enroll />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </Container>
        </Router>
        <Footer />
    </UserProvider>
  );
}

export default App;

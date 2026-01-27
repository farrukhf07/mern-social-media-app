import './App.css';
import Navbar from './components/Navbar';
import MainPage from './components/mainpage';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from 'react';
import ReadMore from './components/ReadMore';
import Uploading from './components/Uploading';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  },[]);

  return (
    <Router>
    {isLoggedIn && <Navbar />}
    <Routes>
      <Route exact path="/register" element={isLoggedIn ? <Navigate to= "/home" /> : <Register setIsLoggedIn={setIsLoggedIn} />} />
      <Route exact path="/login" element={isLoggedIn ? (<Navigate to = "/home"/>) : (<Login setIsLoggedIn={setIsLoggedIn}/>)}/>
      <Route exact path="/home" element={isLoggedIn ? <MainPage /> : <Navigate to="/login"/>} />
      <Route exact path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login"/>} />
      <Route exact path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to='/login'/>} />
      <Route exact path="/services" element={isLoggedIn ? <Services /> : <Navigate to='/login'/>} />
      <Route exact path="/uploading" element={isLoggedIn ? <Uploading /> : <Navigate to='/login'/>} />
      <Route exact path='/read-more' element={<ReadMore/>} />
      {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
    </Routes>
    </Router>
  );
}

export default App;

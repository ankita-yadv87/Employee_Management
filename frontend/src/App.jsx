import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Employee from './components/Employee';
import Department from './components/Department';
import AllEmployee from './components/allEmployee/AllEmployee';


function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/department" element={<Department />} />
          <Route path="/all-employees" element={<AllEmployee/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

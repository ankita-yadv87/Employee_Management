import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Employee from '../components/Employee';
import Department from '../components/Department';

const CustomRoute = () => {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/employees" element={<Employee/>} />
                <Route path="/department" element={<Department/>} />
            </Routes>
        </Router>
    )
}

export default CustomRoute
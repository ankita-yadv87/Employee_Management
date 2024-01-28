import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    console.log("header",isAuthenticated)

    const handleEmployeeLinkClick = (e) => {
        if (!isAuthenticated) {
          alert('Please login to access this resource.');
        }
      };

    return (
        <>
            <div className='nav'>
                <div className="topnav">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/login" >Login</Link>
                    <Link to="/signup">SignUp</Link>
                    <Link to={!isAuthenticated ? "/login" : "/employees"} onClick={(e)=>handleEmployeeLinkClick(e)}>Employee</Link>
                    <Link to={!isAuthenticated ? "/login" : "/department"} onClick={(e)=>handleEmployeeLinkClick(e)}>Department</Link>
                </div>
            </div>

        </>
    )
}

export default Header
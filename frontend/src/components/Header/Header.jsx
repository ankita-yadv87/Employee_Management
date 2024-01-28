import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='nav'>
                <div className="topnav">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/login" >Login</Link>
                    <Link to="/signup">SignUp</Link>
                    <Link to="/employees" >Employee</Link>
                    <Link to="/department">Department</Link>
                </div>
            </div>

        </>
    )
}

export default Header
import React from 'react'
import './header.css';

const Header = () => {
    return (
        <>
            <div className='nav'>
                <div className="topnav">
                    <a className="active" href="#home">Home</a>
                    <a href="#news">Login</a>
                    <a href="#contact">SignUp</a>
                    <a href="#about">Departments</a>
                    <a href="#about">Employees</a>
                </div>
            </div>

        </>
    )
}

export default Header
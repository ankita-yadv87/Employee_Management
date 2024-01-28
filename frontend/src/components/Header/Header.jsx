import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, logoutSuccess, logoutFailure } from '../../redux/features/loginSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    console.log("header", isAuthenticated)
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleEmployeeLinkClick = (e) => {
        if (!isAuthenticated) {
            alert('Please login to access this resource.');
        }
    };

    const handleLogout = async (e) => {
        try {
            const res = await dispatch(logoutUser());
            console.log("reslogout", res);
            
            if (res.success === true) {
                localStorage.removeItem("token");
                navigate("/login")
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    

    return (
        <>
            <div className='nav'>
                <div className="topnav">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/login" >Login</Link>
                    <Link to="/signup">SignUp</Link>
                    <Link to={!isAuthenticated ? "/login" : "/employees"} onClick={(e) => handleEmployeeLinkClick(e)}>Employee</Link>
                    <Link to={!isAuthenticated ? "/login" : "/department"} onClick={(e) => handleEmployeeLinkClick(e)}>Department</Link>
                    {!isAuthenticated ? "" :
                        <button onClick={(e) => handleLogout(e)}>Logout</button>}

                </div>
            </div>

        </>
    )
}

export default Header
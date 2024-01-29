import React, { useEffect } from 'react';
import './myprofile.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/features/adminSlice';
import { getEmployee } from '../../redux/features/employeeSlice';


const MyProfile = () => {

    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    const userData = useSelector((state) => state.employee?.data);
    console.log("header", isAuthenticated)
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            alert('Please login to access this resource.');
        }
        else {
            getMyProfile();
        }
    }, [isAuthenticated, navigate]);

    const getMyProfile = async () => {
        const res = await dispatch(getEmployee());
        console.log("res-allemp", res)
    }

    return (
        <div className="employee-container">
          {isAuthenticated ? (
            <>
              <h2>Welcome, {userData.name}!</h2>
              <div className="user-details">
                <p>Email: {userData.email}</p>
                <p>Location: {userData.location}</p>
                <p>Department: {userData.department}</p>
                <p>Role: {userData.role}</p>
              </div>
            </>
          ) : null}
        </div>
      );
    };
    

export default MyProfile






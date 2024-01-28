import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Employee.css'; // Import your CSS file

const Employee = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const userData = useSelector((state) => state.login.data?.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      alert('Please login to access this resource.');
    }
  }, [isAuthenticated, navigate]);

  const isAdmin = userData && userData.role === 'admin';

  const handleViewAllEmployees = () => {
    navigate("/all-employees");
  };

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
          {isAdmin && (
            <>
              <h3>Admin Actions:</h3>
              <button onClick={handleViewAllEmployees}>View All Employees</button>
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Employee;

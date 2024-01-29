import React, { useEffect, useState } from 'react';
import './AllEmployees.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/features/adminSlice';
import { getEmployee } from '../../redux/features/employeeSlice';

const AllEmployees = ({ employees }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const employee = useSelector((state) => state.employee)
  console.log("STATE.employee", employee)
  console.log("header", isAuthenticated)
  const [allEmployee, setAllemployee] = useState([]);
  const [location, setlocation] = useState("");
  const [role, setrole] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      alert('Please login to access this resource.');
    }
    else {
      getAllEmplooyees();
    }
  }, [isAuthenticated, navigate]);

  const getAllEmplooyees = async (filters = {}) => {
    const {location, name, role} = filters;
    const res = await dispatch(fetchEmployees(location, name, role));
    setAllemployee(res.employee)
    console.log("res-allemp", res)
  }

  const handleFilter = () => {
    // Pass your filters as an object to the API
    const filters = {
      location: location,
      name: name,
      role: role,
    };

    getAllEmplooyees(filters);
    setname("");
    setrole("");
    setlocation("")
  }


  return (
    <>
      <div className="all-employees-container">
        <h1>All Employees</h1>
        <div className="filter-container">
          <label htmlFor="filterName">Name:</label>
          <input type="text" id="filterName" placeholder="Enter name" onChange={(e) => setname(e.target.value)} />

          <label htmlFor="filterRole">Role:</label>
          <input type="text" id="filterRole" placeholder="Enter role" onChange={(e) => setrole(e.target.value)} />

          <label htmlFor="filterLocation">Location:</label>
          <input type="text" id="filterLocation" placeholder="Enter location" onChange={(e) => setlocation(e.target.value)} />

          <button onClick={handleFilter}>Filter</button>
        </div>
        <div className="employee-list">
          {allEmployee?.map((employee) => (
            <div key={employee._id} className="employee-card">
              <h2>{employee.name}</h2>
              <p>Email: {employee.email}</p>
              <p>Location: {employee.location}</p>
              <p>Department: {employee.department}</p>
              <p>Role: {employee.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEmployees;

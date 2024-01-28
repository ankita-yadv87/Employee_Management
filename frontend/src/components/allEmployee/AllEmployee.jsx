import React,{useEffect} from 'react';
import './AllEmployees.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/features/adminSlice';

const AllEmployees = ({ employees }) => {
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    const employee = useSelector((state)=> state.employees)
    console.log("header", isAuthenticated)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      alert('Please login to access this resource.');
    }
    else{
      getAllEmplooyees();
    }
  }, [isAuthenticated, navigate]);

  const getAllEmplooyees = async ()=>{
    const res = await dispatch(fetchEmployees());
    console.log("res-allemp",res)
  }


  return (
    <div className="all-employees-container">
      <h1>All Employees</h1>
      <div className="employee-list">
        {employees?.map((employee) => (
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
  );
};

export default AllEmployees;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllDepartments } from '../../redux/features/adminSlice';
import './department.css'; // Import the CSS file

const Department = () => {
  const isAuthenticated = useSelector((state) => state.login.data?.user?.role);
  const userData = useSelector((state) => state.login.data?.user);
  const dispatch = useDispatch();
  const [allDepartment, setAllDepartment] = useState([]);
  let navigate = useNavigate();
  // const { departments, loading, error } = useSelector((state) => state.department);

  useEffect(() => {
    if (isAuthenticated != "admin") {
      navigate("/login");
      alert('You are not authorized to access this resource.');
    }
    else {
      getAllDepartments();
    }
  }, [isAuthenticated, navigate]);

  const getAllDepartments = async () => {
    const res = await dispatch(fetchAllDepartments());
    setAllDepartment(res.department)
    console.log("res-allemp", res)
  }

  const handleCreateDepartment = () => {
    navigate("/create-department");
  };

  return (
    <>
     <div className="department-list">
      <h2>Department List</h2>
      <ul>
        {allDepartment?.map((department) => (
          <>
           <li key={department._id}>Department Name : {department.name}<br/>
           Manager ID : {department.manager}<br/>Department ID : {department._id}</li>
          </>
         
        ))}
      </ul>
    </div>
    <button onClick={(e)=>handleCreateDepartment(e)}>Create Department</button>
    </>
   
  );
}

export default Department


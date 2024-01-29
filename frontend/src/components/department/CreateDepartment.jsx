import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDepartment } from '../../redux/features/adminSlice';
import './createdepartment.css'; // Import the CSS file


const CreateDepartment = () => {
  const dispatch = useDispatch();
  const [departmentData, setDepartmentData] = useState({
    name: '',
    manager: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   const res = await dispatch(addDepartment(departmentData));
   console.log("departmentfor",res)
   if(res.success == true){
    alert("Created successfully");
    setDepartmentData({
        name: '',
        manager: '',
      })
   }
  };

  return (
    <div className="department-form">
      <h2>Create Department</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={departmentData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="manager">Manager:</label>
          <input
            type="text"
            id="manager"
            name="manager"
            value={departmentData.manager}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Create Department</button>
        </div>
      </form>
    </div>
  );
};
export default CreateDepartment

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllDepartments, deleteDepartment, addDepartment, updateDepartment } from '../../redux/features/adminSlice';
import './department.css';
import Modal from './Modal'
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import '@fortawesome/fontawesome-free/css/all.css';



const Department = () => {
  const isAuthenticated = useSelector((state) => state.login.data?.user?.role);
  const userData = useSelector((state) => state.login.data?.user);
  let departmentData = useSelector((state) => state.admin.departments);
  // console.log("department data", departmentData)
  const dispatch = useDispatch();
  // const [allDepartment, setAllDepartment] = useState(departmentData || []);
  let navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);
  const [tempDeptID, settempDeptID] = useState('');


  const openModal = useCallback((target, tempId) => {
    if (target === 'create-department') {
      setIsCreateModalOpen(true);
    }
    if (target === 'update-department') {
      // settempDeptID(tempId);
      setUpdateIsModalOpen(true);
    }

  }, []);

  const closeModal = useCallback((target) => {
    if (target === 'create-department') {
      setIsCreateModalOpen(false);
    }
    if (target === 'update-department') {
      setUpdateIsModalOpen(false);
      settempDeptID(''); // Clear tempDeptID when closing the modal
    }
  }, []);

  // const { departments, loading, error } = useSelector((state) => state.department);

  useEffect(() => {
    if (isAuthenticated != "admin") {
      navigate("/login");
      alert('You are not authorized to access this resource.');
    }
    else {

      const res = dispatch(fetchAllDepartments());
      departmentData = res.department;
      console.log("res-allemp", res)

    }
  }, [isAuthenticated]);



  // const handleCreateDepartment = () => {
  //   navigate("/create-department");
  // };

  // useEffect(() => {
  //   setAllDepartment(departmentData)
  // }, [departmentData])


  const handleDeleteDepartment = useCallback(async (departmentId) => {
    const res = await dispatch(deleteDepartment(departmentId));

    if (res.success == true) {
      alert(`Department with id ${departmentId} has been deleted successfully`);
    }
  }, [dispatch]);

  // const handleUpdateDepartment = async (departmentId) => {
  //   const res = await dispatch(deDepartment(departmentId));

  //   if (res.success == true) {
  //     alert(`Department with id ${departmentId} has been deleted successfully`);
  //   }
  // };

  const handleCreateDeptSubmit = useCallback(async (deptData) => {
    console.log("handleCreateDeptSubmit", deptData)
    const res = await dispatch(addDepartment(deptData));
    console.log("departmentfor", res)
    if (res.success == true) {
      alert("Created successfully");
    }
    closeModal('create-department');
  }, [dispatch, closeModal]);

  const handleUpdateDeptSubmit = useCallback(async (departmentData) => {
    console.log("handleUpdateDeptSubmit", departmentData, tempDeptID)
    const res = await dispatch(updateDepartment(tempDeptID, departmentData));

    console.log("departmentfor", res)
    if (res.success == true) {
      alert("Updated successfully");
      settempDeptID('')
    }
    closeModal('update-department');
  }, [dispatch, tempDeptID, closeModal]);

  console.log("dept.jsx")

  return (
    <>
      <div className="department-list">
        <h2>Department List</h2>
        <ul>
          {departmentData?.map((department) => (
            <>
              <li key={department._id}><strong>Department Name : {department.name}</strong><br />
                Manager ID : {department.manager}<br />Department ID : {department._id}{'  '}<i className="fas fa-pen-square" onClick={(e) => { openModal('update-department'), settempDeptID(department._id); }}></i> <i className="fas fa-trash delete-icon" onClick={(e) => handleDeleteDepartment(department._id)}></i></li>
            </>

          ))}
        </ul>
      </div>
      <button onClick={() => openModal('create-department')} >Create Department</button>
      <Modal isOpen={isCreateModalOpen} onClose={() => closeModal('create-department')} onSubmit={handleCreateDeptSubmit} btnText="Create"></Modal>
      <Modal isOpen={isUpdateModalOpen} onClose={() => closeModal('update-department')} onSubmit={handleUpdateDeptSubmit} btnText="Update"></Modal>

    </>

  );
}

export default Department


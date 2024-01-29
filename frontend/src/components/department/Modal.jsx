import React, { useEffect, useState, useMemo } from 'react';
import './modal.css'
import { useDispatch } from 'react-redux';
import { addDepartment } from '../../redux/features/adminSlice';

const Modal = ({ isOpen, onClose, onSubmit, btnText, children }) => {
    const modalStyle = {
        display: isOpen ? 'flex' : 'none'
    };

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
        onSubmit(departmentData);
        // const res = await dispatch(addDepartment(departmentData));
        // console.log("departmentfor", res)
        // if (res.success == true) {
        //     alert("Created successfully");
        //     setDepartmentData({
        //         name: '',
        //         manager: '',
        //     })
        // }
        setDepartmentData({
            name: '',
            manager: '',
        })
    };

    console.log("MOdal.js")

    return (
        <>
            <div className="modal" style={modalStyle} onClick={()=>onClose}>
                <div className="modal-content animate" onClick={(e) => e.stopPropagation()}>
                    <span className="close-button" onClick={onClose}>Close</span>
                    <div className="department-form">
                        <h2>{`${btnText ? btnText : "Create"}`} Department</h2>
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
                                <button type="submit">{`${btnText ? btnText : "Create"}`} Department</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>

    );
};

export default Modal

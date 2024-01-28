import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Employee = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    console.log("header", isAuthenticated)
    let navigate = useNavigate();

    useEffect(() => {
    if(!isAuthenticated){
      navigate("/login")
      alert('Please login to access this resource.');
    }

    }, [isAuthenticated])
    

  return (
    <div>Employee</div>
  )
}

export default Employee
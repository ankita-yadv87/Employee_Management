import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./signup.css";
import { useState } from 'react';
import { signupUser } from '../../redux/features/signUpSlice';

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [location, setlocation] = useState("");
  const [department, setdepartment] = useState("");

  const dispatch = useDispatch();
  const signupState = useSelector((state) => state.signup);

  const handleSignup = (e) => {

    e.preventDefault();
    const userData = {
      "name": name,
      "email": email,
      "password": password,
      "location": location, 
      "department": department || null,
      "role": role || "employee"
    }
    console.log("handlesignup", userData)
    dispatch(signupUser(userData));
    clearState();
  };

  const clearState = ()=>{
    setname("");
    setemail("");
    setpassword("");
    setrole("");
    setdepartment("");
    setlocation("")
  }

  return (
    <div >
      <form onSubmit={(e) => handleSignup(e)} style={{ border: "1px solid #ccc" }}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required onChange={(e) => setemail(e.target.value)} />
          {/* <br /> */}

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setpassword(e.target.value)} />
          {/* <br /> */}

          <label htmlFor="name"><b>Name</b></label>
          <input type="text" placeholder="Your Name" name="name" required onChange={(e) => setname(e.target.value)} />
          {/* <br /> */}

          <label htmlFor="location"><b>Location</b></label>
          <input type="text" placeholder="Your Name" name="location" required onChange={(e) => setlocation(e.target.value)} />
          {/* <br /> */}

          <label htmlFor="role"><b>Role</b></label>
          <input type="text" placeholder="Your Role" name="role" onChange={(e) => setrole(e.target.value)} />


          <label htmlFor="department"><b>Department</b></label>
          <input type="text" placeholder="Your Department" name="department" onChange={(e) => setdepartment(e.target.value)} />
          {/* <br /> */}

          {/* <label>
        <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}}/> Remember me
      </label> */}

          <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

          <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn" disabled={signupState.loading}> {signupState.loading ? 'Signing Up...' : 'Sign Up'}</button>
          </div>
        </div>
      </form>    </div>

  )
}

export default SignUp
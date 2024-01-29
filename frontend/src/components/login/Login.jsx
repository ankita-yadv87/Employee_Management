import React from 'react'
import { useState } from 'react';
import image from "../../assets/img_avatar2.png"
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginSuccess, loginFailure } from '../../redux/features/loginSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.login);

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = {
            "email": email,
            "password": password,
        }
        console.log("handlesignup", credentials)
        const res = await dispatch(loginUser(credentials));
        console.log("loginresponse", res, "res.success", res.success)
        dispatch(loginSuccess(res));
        if (res.success == true) {
            navigate("/employees")
            document.cookie = `token=${res.token}; path=/`;
            localStorage.setItem('token',res.token)
        }
        setemail("");
        setpassword("");
    };

    return (
        <>

            <form className='container' onSubmit={(e) => handleLogin(e)}>
                <div className="imgcontainer">
                    <img src={image} alt="Avatar" className="avatar" />
                </div>
                <br />

                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => setemail(e.target.value)} />
                    <br /> <br />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setpassword(e.target.value)} />
                    <br />

                    <button type="submit" className="button" disabled={loginState.loading}>{loginState.loading ? 'Logging In...' : 'Login'}</button>
                    {/* <label>
                        <input type="checkbox" checked="checked" name="remember" Remember me />
                    </label> */}
                </div>

                {/* <div className="container" style={{backgroundColor: "#f1f1f1"}}>
                    <button type="button" className="cancelbtn">Cancel</button>
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div> */}
            </form>

        </>
    )
}

export default Login
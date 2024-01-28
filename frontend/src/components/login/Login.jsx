import React from 'react'
import image from "../../assets/img_avatar2.png"
import "./login.css"

const Login = () => {
    return (
        <>

            <form className='container' action="action_page.php" method="post">
                <div className="imgcontainer">
                    <img src={image} alt="Avatar" className="avatar" />
                </div>
                <br />

                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required />
                    <br /> <br />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />
                    <br />

                    <button type="submit" className="button">Login</button>
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
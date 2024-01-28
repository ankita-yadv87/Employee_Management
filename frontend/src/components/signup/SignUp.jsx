import React from 'react';
import "./signup.css";

const SignUp = () => {
  return (
    <div >
      <form action="action_page.php" style={{ border: "1px solid #ccc" }}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />
          {/* <br /> */}

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
          {/* <br /> */}

          <label htmlFor="name"><b>Name</b></label>
          <input type="text" placeholder="Your Name" name="name" required />
          {/* <br /> */}

          <label htmlFor="name"><b>Location</b></label>
          <input type="text" placeholder="Your Name" name="name" required />
          {/* <br /> */}

          <label htmlFor="location"><b>Name</b></label>
          <input type="text" placeholder="Your Role" name="role" required /><br />

          <label htmlFor="role"><b>Role</b></label>
          <input type="text" placeholder="Your Role" name="name" required />

          
          <label htmlFor="department"><b>Department</b></label>
          <input type="text" placeholder="Your Department" name="department"/>
          {/* <br /> */}

          {/* <label>
        <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}}/> Remember me
      </label> */}

          <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

          <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
          </div>
        </div>
      </form>    </div>

  )
}

export default SignUp
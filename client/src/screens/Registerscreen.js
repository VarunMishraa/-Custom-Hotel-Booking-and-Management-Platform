import axios from "axios";
import React, { useState } from "react";
import '../css/Registerscreen.css'; // Ensure the CSS file is imported

export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password
      };
      try {
        const result = await axios.post('/api/users/register', user);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match!"); // Alert if passwords do not match
    }
  }

  return (
    <div className='register'>
      <div className="register-box">
        <h2>Register</h2>
        <div>
          <input
            required
            type="text"
            placeholder="Name"
            className="form-control mt-2"
            value={name}
            onChange={(e) => { setname(e.target.value) }}
          />
          <input
            required
            type="email" // Change to email input type for validation
            placeholder="Email"
            className="form-control mt-2"
            value={email}
            onChange={(e) => { setemail(e.target.value) }}
          />
          <input
            required
            type="password" // Change to password input type
            placeholder="Password"
            className="form-control mt-2"
            value={password}
            onChange={(e) => { setpassword(e.target.value) }}
          />
          <input
            required
            type="password" // Change to password input type
            placeholder="Confirm Password"
            className="form-control mt-2"
            value={cpassword}
            onChange={(e) => { setcpassword(e.target.value) }}
          />
          <button onClick={(e) => { e.preventDefault(); register(); }} className="btn btn-primary rounded-pill mt-4">REGISTER</button>
          <br />
          <a className="link" href="/login">Click Here To Login</a>
        </div>
      </div>
    </div>
  );
}

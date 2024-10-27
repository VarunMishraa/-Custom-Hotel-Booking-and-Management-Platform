import axios from "axios";
import React, { useState, useEffect } from "react";



export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  async function register(){
      if(password===cpassword)
      {
        const user={
          name,
          email,
          password
      }
      try {
        const result = await axios.post('/api/users/register', user);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      }
     
}

  return (
    <div className='register'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left bs">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e)=>{setcpassword(e.target.value)}}
            />
            <button onClick={(e) => { e.preventDefault(); register(); }} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
            <br/>
            <a style={{color:'black'}} href="/login">Click Here To Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
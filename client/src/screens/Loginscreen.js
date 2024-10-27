import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Loginscreen() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    async function login(){
      const user={
        email,
        password
    }
    try {
      const result = await axios.post('/api/users/login', user);
      console.log('API Response:', result.data);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      
    } catch (error) {      
      console.log(error);      
    }
    }

    return (
        <div className='login'>
         <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left bs">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Login
          </h2>
          <div>
            <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            <button onClick={login} className="btn btn-success mt-3 mb-3">LOGIN</button>
            <br/>
            <a style={{color:'black'}} href="/register" className="mt-2">Click Here To Register</a>
          </div>
        </div>
      </div>
        </div>
    )
}
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Loginscreen.css'; // Import the CSS file for styling

export default function Loginscreen() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Using useNavigate hook for redirection

    async function login() {
        const user = {
            email,
            password,
        };
        try {
            const result = await axios.post('/api/users/login', user);
            console.log('API Response:', result.data);

            // Assuming the response structure contains a success flag
            if (result.data && result.data.success) {
                localStorage.setItem('currentUser', JSON.stringify(result.data.user || result.data.token));
                navigate('/'); // Redirect to home after successful login
            } else {
                setErrorMessage("Invalid login credentials");
            }
        } catch (error) {
            console.log('API Error:', error.response ? error.response.data : error.message);
            setErrorMessage("Login failed. Please try again.");
        }
    }

    return (
        <div className='login'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4 mt-5 text-left login-box">
                    <h2 className="text-center mb-4">Login</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
                    <div className="input-group">
                        <input 
                            required 
                            type="text" 
                            placeholder="Email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setemail(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password" 
                            placeholder="Password"
                            className="form-control mt-3"
                            value={password}
                            required
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <button onClick={login} className="btn btn-success mt-4 mb-3 w-100">LOGIN</button>
                    <div className="text-center">
                        <a href="/register" className="link">Click Here To Register</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, {useState} from 'react';
import { backendUrl } from '../js/data';
import './../css/AdminLogin.css';
import { handleResponse } from '../js/handleResponses';
import { ResponseMessage } from './Products';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false,
        message: "Logging In",
        color: ""
    })

    const login = (e) => {
        e.preventDefault();

        setStatusMessageOpts({
            ...statusMessageOpts,
            show: true
        })

        fetch(`${backendUrl}/api/users/login-user`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, password})
        })
        .then(res => res.json())
        .then(result => {
            
            if(result.message === "Logged in successfully"){
                const token = JSON.stringify(result.token);
                localStorage.setItem('token', token);
                navigate('/admins/dashboard')
            }else {
                handleResponse(
                    result.message,
                    null,
                    statusMessageOpts,
                    setStatusMessageOpts,
                    null
                )
            }
        })
        .catch(() => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
            )
        })
    }

  return (

    <div className='form-container'>
        
        <form className='login-form'>

            <h2>Login Here</h2>

            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message}/>}<br></br>

            <div className="admin-name-input-container">
                <input type="text" placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="admin-password-input-container">
                <input type="password" placeholder='Please Enter Your Password' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <button type='submit' onClick={login} className="login-btn">
                Login
            </button>
        </form>
    </div>
  )
}

export default AdminLogin
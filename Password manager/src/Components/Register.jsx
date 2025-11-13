import React, {useState}from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import reset from '../assets/resetpassword.jpg'

const Register = () => {
const [RegForm,setRegForm] = useState ([{email:"",password:"",username:""}]);
const navigate = useNavigate ();
    
    const handleRchange = (e)=>{
      setRegForm ({...RegForm,[e.target.name]:e.target.value});
    }

    const handleRsubmit = ()=> {
      e.preventDefault ();
      navigate ("/")
    }
  return (
    <div className='auth-sec'>
      <div className="auth-form" onSubmit={handleRsubmit}>
        <h1>Register here</h1>
        <form action="">
            <input type='text' name='username' placeholder='enter your username' minLength={4} onClick={handleRchange} />
            <input type='email' name='email' placeholder='enter your e-mail' minLength={12} onClick={handleRchange} />
        <input type="password" name="password" placeholder='enter your password' minLength={4} onClick={handleRchange} />
        <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register

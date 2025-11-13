import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate ();
    const [loginForm,setLoginForm] = useState ([{email:"",password:""}]);
    
    const handleChange = (e)=> {
        setLoginForm ({...loginForm,[e.target.name]:e.target.value})
    }

    const handleSubmit = ()=> {
        e.preventDefault ();
        console.log("Hello world",loginForm)
    }
  return ( <div className='auth-sec'>
    <div className='auth-form'>
        <h1>Login Here</h1>
      <form action='' onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='enter your e-mail' minLength={12} onClick={handleChange} />
        <input type="password" name="password" placeholder='enter your password' minLength={4} onClick={handleChange} />
        <span>if you don't have an account, please <span className='link' onClick={()=> navigate('/register')}>register here</span></span>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>)
}

export default Login

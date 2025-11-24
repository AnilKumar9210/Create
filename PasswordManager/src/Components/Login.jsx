import React, { useContext,useEffect, useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../Context/context';

const Login = () => {
    const navigate = useNavigate ();
    const [forgot,setForgot] = useState (false);
    const [sent,setSent] = useState (false);
    const [show,setShow] = useState (false);
    const [OTP,setOtp] = useState ('');
    const [changeEmail,setChangeEmail] = useState ('');
    const [newPass,setNewPass] = useState ({otp:'',newPass:'',pass:''})
    const [invalid,setInvalid] = useState ({otp:false,pass:false})
    const {setisLogin,setUser,loginForm,setLoginForm} = useContext (Appcontext);

    useEffect (()=> {
      const token = localStorage.getItem ('token');
      const user = localStorage.getItem ('user');

      if (token && user) {
        setisLogin (true);
        navigate ('/')
        setUser (JSON.parse (user));
      } else {
        setisLogin(false)
      }
    },[])

    const handleNewChange = (e)=> {
      setNewPass ({...newPass,[e.target.name]:e.target.value});
    }
    
    const handleChange = (e)=> {
        setLoginForm ({...loginForm,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=> {
      e.preventDefault ();
      try {
        const res = await fetch ('http://localhost:5000/api/auth/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:loginForm.email,
          password:loginForm.password
        }),
      })

      const data = await res.json ();

      if (data.token) {
        localStorage.setItem ('token', data.token);
        localStorage.setItem ('user',JSON.stringify(data.user))
        setisLogin (true);
        navigate ('/')
      }

      } catch (error) {
        console.log("error while fetching data", error);
      }
    }

    const handleOtp = async (e)=> {
      e.preventDefault ()
      try {
        const res = await fetch ('http://localhost:5000/api/auth/send-otp', {
          method:'POST',
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem ('token')}`
          },
          body : JSON.stringify ({email:changeEmail})
        })

        const data = await res.json ();
        setOtp (data.otp);
        setSent (true);
      } catch (err) {
        console.log(err)
      }
    }


    const resetPassword = async (e)=> {
      e.preventDefault ()
      if (OTP != newPass.otp) {
        setInvalid ({...invalid,['otp']:true})
        return;
      }

      if (newPass.pass !== newPass.newPass) {
        setInvalid ({...invalid,['pass']:true})
        return ;
      }

      try {
        await fetch ('http://localhost:5000/api/auth/reset-password', {
          method:'POST',
          headers : {
            "Content-Type":'application/json',
          Authorization:`Bearer ${localStorage.getItem ('token')}`
          },
          body : JSON.stringify ({
            email:changeEmail,
            newPassword:newPass.newPass,
            otp:newPass.otp
          })
        })
        console.log(OTP,newPass.otp)
        setForgot (false);
        setSent (false)
      } catch (err) {
        console.log(err)
      }
    }




  return ( <div className='auth-sec'>
    {!forgot ?<div className='auth-form'>
        <h1>Login Here</h1>
      <form action='' onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='enter your e-mail' minLength={12} value={loginForm.email} onChange={handleChange} />
        <input type="password" name="password" placeholder='enter your password' minLength={4} value={loginForm.password} onChange={handleChange} />
        <span >Forgot password,<span className='link' onClick={()=> {setForgot(true)}}>Reset here</span></span>
        <span>if you don't have an account, please <span className='link' onClick={()=> navigate('/register')}>register here</span></span>
        <button type="submit">Login</button>
      </form>
    </div> : <div className='auth-form'>
        <h1>Reset Password</h1>
      {!sent ? <form action='' onSubmit={handleOtp}> 
        <input type='email' name='email' 
        placeholder='enter your e-mail' 
        required
        minLength={12} 
        onChange={(e)=>setChangeEmail (e.target.value)} 
        />
        <button type="submit">Send-Otp</button>
        </form> : <form action='' className='otp-form' onSubmit={resetPassword}>
          <input type='text' 
          name="otp" value={newPass.otp} 
          placeholder='Enter OTP' 
          onChange={handleNewChange}
          id="" />
          <span className={`${invalid.otp ? 'error':'none'}`}>invalid otp</span>

          <input type="password" 
          name="pass" value={newPass.pass} 
          placeholder='Enter new password' 
          onChange={handleNewChange} 
          id="" />

          <input type={show ? "text" : "password"} 
          value={newPass.newPass} 
          placeholder='Confirm your password' 
          onChange={handleNewChange} 
          name="newPass" 
          id="" />

          <span className={`${invalid.pass ? 'error' : 'none'}`}>password does not match</span>
          <div>
          <input type="checkbox" name="show" id="" onChange={()=>setShow (!show)} /> show pasword
          </div>
          <button type="submit" className="reset-button">Reset Password</button></form>}
      </div>}
  </div>)
}

export default Login

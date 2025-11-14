import React, { useContext, useEffect, useState } from 'react'
import './Home.css'    
import user from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../Context/context'

const Home = () => {

  const navigate = useNavigate ();
  const {isLogin} = useContext (Appcontext);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [result, setResult] = useState ([]);

  useEffect (()=>{
    if (!isLogin){
      navigate ('/login');
    }
  }, [isLogin])

  const handleSubmit = (e)=> {
    e.preventDefault();
    setResult([...result, formData]);
    setFormData ({
      website: '',
      username: '',
      password: ''
    });
  }

  const handleChange = (e)=> {
    setFormData ({...formData, [e.target.name]:e.target.value})
  }
  return (
    <div className='home'>
      <nav><div>
        <span style={{color:'white'}}>Pass/</span><span style={{color:'#0a031f'}}>Manager</span>
      </div>
      <div className="edit">
        <span className="userName">Anil kumar</span>
        <img src={user} alt="user" className="userLogo"/>
      </div>
      </nav>

      <div className="getData">
        <h1>Welcome Back, Save your password securely</h1>
        <form action="" className='getDetails' onSubmit={handleSubmit}>
          <input type="text" name='website' value={formData.website} required placeholder='Enter Website name' onChange={handleChange}/>
          <div className="div">
          <input type="text" name='username' value={formData.username} required placeholder='Enter Username or Email' onChange={handleChange}/>
          <div className="pass">
            <input type={showPass ? "text" : "password"} name='password' value={formData.password}   required placeholder='Enter Password' onChange={handleChange}/>
            {/* <div style={{position:'absolute'}}> */}
            <svg onClick={() => setShowPass(!showPass)} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
            {/* </div> */}
          </div>
          </div>
          <button type="submit">Add Password</button>
        </form>
      </div>
      <div className="line"></div>
      <div className="showData">
        <h2>Saved Passwords</h2>
        {result.map((item, index)=> (
          <div className="card" key={index} style={{backgroundColor:index%22 == 0? '#ccfad5':''}}>
            <div className='cardDetails'>

            <span>{item.website}</span>
            <span>{item.username}</span>
            <span style={{alignContent:'center'}}>{item.password}</span>
            </div>
             <svg onClick={()=>{setFormData(item)}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
</svg>
            

          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

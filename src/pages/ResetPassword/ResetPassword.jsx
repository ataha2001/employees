import React from 'react'
import { auth } from '../../configs/firebase.config'
// import './loginStyle.css'
import { Link } from "react-router-dom";


const ResetPassword = () => {
  return (
    
    // <div style={{paddingTop: '70px', marginLeft:'0px',paddingLeft:'0px', display:'block'}} >
    
    //     <div>Login</div>
    //     <div>
    //         <input type='email' placeholder='email' />
    //         <input type='password' placeholder='password' />
    //     <button>Login</button>
    //     </div>
    // </div>
    <div className='page'>
      <div className='head'>
        <h2>HR Management System</h2>
      </div>
      <div className='box'>
        <span className='borderLine'></span>
        <form>
          <h2>Reset Password</h2>
          <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
          <div className='inputBox'>
            <input type='email' required />
            <span>Email</span>
            <i></i>
          </div>
          
          <div className='links'>
            
            <Link className='links' to="/login">
              Login
            </Link>
            <Link className='links' to="/register">
              Register
              </Link>
        
          </div>
          <input type='submit' value="Reset" />
        </form>
      </div>
    </div>
    
  )
}

export default ResetPassword
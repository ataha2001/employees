import React from 'react'
import { auth } from '../../configs/firebase.config'

const Login = () => {
  return (
    
    <div style={{paddingTop: '70px', marginLeft:'0px',paddingLeft:'0px', display:'block'}} >
    
        <div>Login</div>
        <div>
            <input type='email' placeholder='email' />
            <input type='password' placeholder='password' />
        <button>Login</button>
        </div>
    </div>
    
  )
}

export default Login
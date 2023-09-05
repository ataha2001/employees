import React from 'react'
import { Link } from 'react-router-dom'

const End = () => {
  return (
    <div className='page'>
      <div className='head'>
        <h2>HR Management System</h2>
      </div>
      <div className='box' style={{height:'20vh'}}>
        <span className='borderLine'></span>
        <form>
          <h2 style={{marginTop:'0px'}}>See You soon</h2>
          <div className='links'>
            
            <Link className='links' to="/login" style={{marginTop:'10px'}}>
             <h3>Login</h3>
            </Link>
            
        
          </div>
         
        </form>
        </div>
        <div>
      </div>
    </div>
  )
}

export default End
import React, { useEffect, useState } from 'react'
import { auth } from '../../configs/firebase.config'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import './loginStyle.css'
import { Link, useNavigate } from "react-router-dom";
import { setNewUser } from '../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchUserQuery,useGetUserByIdMutation } from '../../services/firebaseApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [logError, setLogError] = useState(false)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [id , setId ] = useState('')
    
    

    // const checkUser =  useFetchUserQuery(undefined)
    const {data: checkUser, error , isError} =  useFetchUserQuery(id ? id : skipToken)
    
    useEffect(()=>{
      setId(id)
      const user = checkUser
      if (user){
        // console.log("user  in collection");
        // console.log('checkUser active',checkUser.active)
        if (user.active){
          // console.log('active',checkUser.active)
          // const email = user.email
          // const name = user.name
          // const active = user.active
          dispatch(setNewUser({user}));
          // setNewUser({user})
          console.log('user==',user)
          localStorage.setItem('userDetails', JSON.stringify({ user }));
          navigate('/dashboard')
        }else{
          console.log(' active',checkUser.active)
          navigate('/registerresult')
        }
    }else{
      console.log("user not in collection");

    }
    },[id, checkUser])
  //   useEffect(()=>{
  //     const listen = onAuthStateChanged(auth, (user)=>{
  //         if (user){
  //           setUser(user)
  //           setNewUser(user.auth.currentUser)
  //           const email = user.auth.currentUser.email
  //           dispatch(setNewUser(email));
  //           navigate('/dashboard')
  //           console.log('user', user.auth.currentUser.email)
  //           // console.log('user', user.auth.currentUse)
  //         }else{
  //           setUser(null)
  //         }
  //     })
  // },[navigate,id])
  
  
    const handleLogin = (e)=>{
      e.preventDefault()
      
      signInWithEmailAndPassword(auth, email,password)
      .then((userCredential)=>{
        // id = userCredential.user.uid
        setId(userCredential.user.uid)
        // checkUser(id)    
        console.log('checkUser.data',checkUser)
        
        // setNewUser(userCredential.user.email)
        // // setNewUser({email:"ahraf"})
        // console.log(userCredential.user.email)
        // navigate('/dashboard')
      }).catch((error) =>{
        console.log(error);
        setLogError(true)

      })
    }
  return (
    
    <div className='page'>
      <div className='head'>
        <h2>HR Management System</h2>
      </div>
      <div className='box'>
        <span className='borderLine'></span>
        <form>
          <h2> Sign in</h2>
          <div className='inputBox'>
            <input type='email' required onChange={(e)=> setEmail( e.target.value)}/>
            <span>Email</span>
            <i></i>
          </div>
          <div className='inputBox'>
            <input type='password' required onChange={(e)=> setPassword( e.target.value)}/>
            <span>Password</span>
            <i></i>
          </div>
          <div className='links'>
            
            <Link className='links' to="/resetpassword">
              Forget Password
            </Link>
            <Link className='links' to="/register">
              Register
              </Link>
        
          </div>
          <input type='submit' value="Login" onClick={handleLogin} />
        </form>
        </div>
        <div>
        {logError ? <h3 style={{color:'red'}} > Error.. please check your entry  </h3> : '' }
      </div>
    </div>
    
  )
}

export default Login
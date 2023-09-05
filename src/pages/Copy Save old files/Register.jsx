import React, { useState } from 'react'
import { auth, googleProvider } from '../../configs/firebase.config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { Button, Divider } from '@mui/material'


const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser);
    const image =  auth?.currentUser?.photoURL ;
    // console.log(auth.currentUser.password);

    const register = async ()=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            
        } catch (error) {
            console.log(error)
        }
    }
    const registerWithGoogle = async () =>{
        try {
            await signInWithPopup(auth, googleProvider)
            
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async ()=>{
        try {
            await signOut(auth)
            
        } catch (error) {
            console.log(error)
        }
    }
  
  return (
    <div style={{paddingTop: '70px', marginLeft:'0px',paddingLeft:'0px', display:'block'}} >
    <img src={image ? image : ''} />
    <p>{auth?.currentUser?.displayName}</p>
    <div>Register</div>
    <div>
        <input type='email' placeholder='email' onChange={(e)=> setEmail( e.target.value)} />
        <input type='password' placeholder='password' onChange={(e)=> setPassword( e.target.value)} />

        </div>
        <Button sx={{marginTop:'20px'}} variant='contained' color='primary' onClick={register} >Register</Button>
        <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
        <Button  variant='contained' color='secondary' onClick={registerWithGoogle} >Register with Google Account</Button>
        <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
        <Button  variant='contained' color='warning' onClick={logout} >Logout</Button>


        <p>ataha@gmail.com</p>
        <p>ashraf123</p>
</div>
  )
}

export default Register
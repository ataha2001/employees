import React, { useState } from 'react'
import { auth, googleProvider } from '../../configs/firebase.config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut, fetchSignInMethodsForEmail, signInWithRedirect } from 'firebase/auth'
import { Button, Divider } from '@mui/material'
import './registerStyle.css'
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from '../../services/firebaseApi'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [exsist, setExsist] = useState(false)
    const navigate = useNavigate()
    const [createData ] = useCreateUserMutation();
    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser);
    // const image =  auth?.currentUser?.photoURL ;
    // console.log(auth.currentUser.password);


      const register = async()=>{
        let signInMethodes = await fetchSignInMethodsForEmail(auth, email)
        if (signInMethodes.length > 0){
            setExsist(true)
        }else{
            await createUserWithEmailAndPassword(auth, email, password).then(cred =>{
                const id = cred.user.uid
                const active =false
                console.log('check id ', id)
                createData({email, id , password, active})

            }

            )
            navigate('/registerresult')
        }
      }

    const registerWithGoogle = async () =>{
        console.log(googleProvider);
        try {
            await signInWithPopup(auth, googleProvider)
            // await signInWithRedirect(auth,googleProvider )
            // navigate('/login')
        } catch (error) {
            // console.log(error)
            let signInMethodes = await fetchSignInMethodsForEmail(auth, email)
            if (signInMethodes.length > 0){
                setExsist(true)
            }else{
                // await createUserWithEmailAndPassword(auth, email, password)
                // navigate('/login')
            }
        }
    }
    const logout = async ()=>{
        try {
            await signOut(auth)
            console.log("log out");
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='page'>
            <div className='head'>
                <h2>HR Management System</h2>
            </div>
            <div className='box'>
                <span className='borderLine'></span>
                <p> {auth?.currentUser?.displayName} </p>
                <div className='form'>
                    <h2>Register</h2>
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
                        
                        <Link className='links' to="/login">
                            already have account
                        </Link>
                        
                        <Link  to="" onClick={registerWithGoogle}>
                        Register with Google
                    </Link>
                    </div>
                    <input type='submit' value="Register" onClick={register} />
                
                </div>
                </div>
                <Button  variant='contained' color='warning' onClick={logout} >Logout</Button>
                {exsist ? <h3 style={{color:'red'}} > user already exisits  </h3> : '' }
        </div>
    )
}

export default Register


                        // <Link className='links' to="/about">
                        //     Login
                        // </Link>
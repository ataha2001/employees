import React, { useEffect, useState } from 'react'
import './users.scss'
import './users.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, } from 'react-router-dom'
import { useParams }  from "react-router-dom";
import { Field, Form, Formik } from 'formik'
import { INIT_USER_STATE, USER_FORM_VALIDATION } from './userSource'
import { useCreateUserMutation, useFetchUserByEmailQuery, useFetchUserQuery, useGetUsersQuery, useUpdateUserMutation } from '../../services/firebaseApi'
import { useTheme } from '@emotion/react'
import { auth, storage } from '../../configs/firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Notification from '../../components/Notifications/Notification'

const iniState = {
    name:'',
    email:'',
    phone:'',
    password:'',
    active:'',
    image:'',
}

const AddUser = ({ inputs, title }) => {

    let renderCount = 0
    const { id } = useParams();
    const theme = useTheme()
    // const [file, setFile] = useState("");
    const [createData ] = useCreateUserMutation();
    const [checkEmail, setCheckEmail] = useState('')
    const [exsist, setExsist] = useState(false)
    const {data: users} = useGetUsersQuery()
    const {data: userByEmail} = useFetchUserByEmailQuery(checkEmail ? checkEmail : skipToken)
    const navigate = useNavigate()
    const [notify, setNotify] = useState({isOpen:false, message: "", type:""})
    
    const { data: userById, error, isError, isLoading, } = useFetchUserQuery(id ? id : skipToken)
    const [ updateUser ] = useUpdateUserMutation()
    const [data , setData] = useState(iniState)
    const [file , setFile] = useState(null)
    const [progress , setProgress] = useState(null)
    
    useEffect(()=>{
       
        if (id && userById){
            setData({...userById})
           }
    }, [id, userById])
    
    useEffect(()=>{
        setCheckEmail(userByEmail)
    },[checkEmail, userByEmail])

    useEffect(()=>{
    const uploadFile = ()=>{
        const storageRef = ref (storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        console.log('uploadTask=', uploadTask)
        uploadTask.on(
            'state_change',
            (snapshot) =>{
                const progress = 
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + "% done")
                setProgress(progress)
                switch(snapshot.state){
                    case 'paused':
                        console.log('upload is paused')
                        break
                    case  'running':
                        console.log('upload is running')
                        break
                    default:
                        break        
                } 
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    // toast.info()
                    setNotify({
                        isOpen: true,
                        message: "Uploaded Successfuly .....!",
                        type:'info'
                      })
                    //   console.log('get data url=', downloadUrl)
                    setData((prev)=> ({...prev, image: downloadUrl}))
                    // setFile(downloadUrl)
                })
                // console.log('file ====', data.imgURL)
                }
        )
        }
        file && uploadFile()
    },[file])

      
    const handleSubmit = async (values, { setSubmitting }) => {
        // Handle form submission logic here
        if (title==="Update"){
            updateUser({id,data})
            navigate('/users')
            console.log('update')
            console.log('update', data)
            setNotify({
                isOpen: true,
                message: "Updated Successfuly .....!",
                type:'info'
              })
        }else{
            console.log('not update')
            values.image = data.image
            const user = users.find(obj=>{
                return obj.email === values.email
            })
            if (user){
                console.log('find')
                setExsist(true)
            }else{
                console.log(' not find')
                console.log(' values', values)
                console.log(' data', data)

                await createUserWithEmailAndPassword(auth, data.email, data.password).then(cred =>{
                    const id = cred.user.uid
                    const active =data.active
                    const email = data.email
                    const password = data.password
                    const name = data.name
                    const phone = data.phone
                    const image = data.image
                    console.log('data file ', values)
                    createData({ email, id , password, active, name, phone, image})
                    setExsist(false)
                    navigate('/users')
                })
            }

        }
        
      };

      

    renderCount++
  return (
    
        <div className='addUser' >
            <div className="newContainer">
                <div className='top'>
                    <h1>{title} User</h1>
                    <h2>Render : {renderCount}</h2>
                </div>
                    
                <div className='bottom'>
                    <div className='left'>
                        <img
                        src={data.image ? data.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
                            // src={
                            //     file
                            //     ? URL.createObjectURL(file)
                            //     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            // }
                        alt="user"
                        />
                    </div>
                    <div className='right'>
                    
                        <Formik
           
                            initialValues={{...INIT_USER_STATE}}
                            validationSchema={USER_FORM_VALIDATION} 
                            onSubmit={handleSubmit}
                        >
                        <Form>        
                            <div className="formInput">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                                // disabled
                                // value={data.image ? data.image  : ''}
                            />
                            </div>
            
                            {inputs.map((input) => (
                            <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                { input.name === 'active' ? (
                                    <input 
                                        type={input.type} 
                                        checked={data.active ? data.active : ''}
                                        // value={data.active ? data.active : ''}
                                        onChange={(e) => setData({...data, active: e.target.checked})}
                                        // defaultValue={data.active}
                                        // readOnly
                                        
                                    />
                                ) : 
                                (
                                <Field 
                                    type={input.type} 
                                    placeholder={input.placeholder}
                                    id={input.name} 
                                    name={input.name}
                                    // value={userById[input?.name] ? userById[input?.name]  : ''}
                                    value={data[input.name] ? data[input.name] : '' }
                                    onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                />
                                )   
                                }
                                </div>
                            ))}
                            <button type='submit' 
                                disabled={progress !== null && progress  < 100 } 
                            >{title}</button>
                            <button type='button' onClick={()=> navigate('/users')} >Cancel</button>
                        </Form>
                      
                        </Formik>
                        
                    </div>
                </div>
                <Notification 
                notify={notify}
                setNotify={setNotify}
            />
                {exsist ? <h3 style={{color:'red', marginLeft:'10px'}} > User already record.. you can update it ...  </h3> : '' }
            </div>
        </div>
   
  )
}
export default AddUser
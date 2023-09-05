import React, { useEffect } from 'react'
import './users.scss'
import './users.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchUserQuery } from '../../services/firebaseApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { CircularProgress } from '@mui/material'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


// let renderCount = 0
const ViewUser = ({inputs, title}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { data: user, error, isError, isLoading, } = useFetchUserQuery(id ? id : skipToken)
   
    useEffect(()=>{
        isError && console.log("ERROR=", error)
    },[isError,error])

    
    if (isLoading) {
        return (
            <div className='addUser' >
            <div className="newContainer">
                <div className='top'>
                    <h1>View User</h1>
                </div>
                    
                <div className='bottom' style={{ justifyContent:'center'}}>
                    <CircularProgress   color="secondary" />
                    <br />
                    <div>
                    <p>Loading Data .......</p>
                    </div>
                </div>
                </div>
            </div>
        )}
           
    // renderCount++
  return (
    <div className='addUser' >
        <div className="newContainer">
            <div className='top'>
                <h1>View User</h1>
            </div>
                
            <div className='bottom'>
                <div className='left'>
                    <img src={user.image ? user.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="user" />
                </div>
                <div className='right'>
                    <form>
                        <div className="formInput">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                // value={()=>setFile(userDetails.image)}
                                // onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                                disabled
                            />
                        </div>
        
                        {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            { input.name === 'active' ? (
                                <input 
                                    type={input.type} 
                                    checked={user.active}
                                    readOnly
                                />
                            ) : 
                            (<input 
                                type={input.type} 
                                placeholder={input.placeholder}
                                id={input.name} 
                                value={user[input.name] ? user[input.name] : '' }
                                readOnly
                            />   )
                        }
                        </div>
                        ))}
                        
                        <button type='button' onClick={()=> navigate('/users')} >Cancel</button>
                    </form>
                </div>
            </div>
            <p style={{marginLeft:'20px'}}>Created At: {user?.createdAt.toDate().toLocaleString()}</p>
        </div>
    </div>
  )
}

export default ViewUser
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../../../configs/firebase.config'
import { snapshotEqual } from 'firebase/firestore'
import { UploadFile } from '@mui/icons-material'

const iniState = {

}

const FormUploadImage = () => {
    const [data , setData] = useState(iniState)
    const [file , setFile] = useState(null``)
    const [progress , setProgress] = useState(null)
    
    useEffect(()=>{
    const uploadFile = ()=>{
        const storageRef = ref (storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

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
                    setData((prev)=> ({...prev, img: downloadUrl}))
                })
                }
        )
        }
        file && uploadFile()
    },[file])

  return (
    <div>FormUploadImage</div>
  )
}

export default FormUploadImage
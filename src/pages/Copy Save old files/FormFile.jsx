import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, FormHelperText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import logo from './default-profile-picture.png'
import { useField, useFormikContext } from 'formik'
import FormError from '../FormError/FormError'
import { storage } from '../../../configs/firebase.config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const FormFile = ({ name, error }) => {
    const {field, meta } = useField(name)
    const {setFieldValue} = useFormikContext()
    const [ preview , setPreview] = useState(logo)
    const [ progress, setProgress] = useState(null)
    const [data, setData] = useState(null)
    const [file, setFile] = useState(null)

    // const onImageChange = (e) => {
    //     const reader = new FileReader()
        
    //     reader.onload = () =>{
    //         setPreview(reader.result)
    //     }
    //     reader.readAsDataURL(e.target.files[0])
    //     // setFieldValue('file', e.target.files[0] )
    //     setFieldValue('file', preview )
    // }
    const configFormContro = {}

    if(meta && meta.touched && meta.error ){
        configFormContro.error = true
        // configCheckBox.helperText = meta.error
    }
    // console.log('ashraf *********************')
    useEffect(() => {
            const reader = new FileReader()
        
        reader.onload = () =>{
            setPreview(reader.result)
        }
      const uploadFile = () =>{
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_change',
            (snapshot) =>{
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("Upload is " + parseInt(progress) + ' % done') 
                setProgress(progress)   
                switch (snapshot.state){
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break        
                }
            },
            (error) =>{
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    // toast.info('Image Upload Successfuly....')
                    setPreview(file)
                    console.log('get data')
                    console.log(preview)
                    setData((prev)=>({...prev, imgURL: downloadURL}))
                })
            }
        )
      }
      file && uploadFile()
      setFieldValue('file', file)
    //   setPreview(file)
    }, [file,setFieldValue, preview])

    const handleImageChange = (e) =>{

        setFile(e.target.files[0])
        setFieldValue('file', file)
        setPreview(file)
    }
  return (
    <>
    { preview ? 
        
        <FormControl {...configFormContro} sx={{  display:'flex'}}>
            <Card sx={{ maxWidth: 345, height:'260px',marginTop:'20px', }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="180"
                        image={preview}
                        alt="Error Image"
                        width="140"
                    />
                </CardActionArea>
                <CardActions sx={{ justifyContent:'center'}}>
                    <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        sx={{marginTop: '20px', }}
                        // sx={{backgroundColor:theme.palette.text.secondary}}
                        // bgColor="secondary" 
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChangeCapture={(e)=> handleImageChange(e)}
                            // onChange={(e)=> setFile(e.target.files[0])}
                            // onChange={onImageChange}
                            // onChange={(e)=> setFieldValue('image', e.target.files[0])}
                        />
                    </Button>
                </CardActions>
                
            </Card>
            </FormControl>
            
            : "loading...."
        }
       
</>
  )
}

export default FormFile
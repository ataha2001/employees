import React, { useEffect, useRef, useState } from 'react'
import { useGetDepartmentsQuery } from '../../services/jsonServerApi'
import { Container, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormTextField from '../../components/FormUI/FormTextField/FormTextField'
import FormSelect from '../../components/FormUI/FormSelect/FormSelect'
import country from '../../data/country.json'
import axios from 'axios'


const OneEmployee = () => {

    const { data: departments, isSuccess, isLoading, isFetching, isError , error} = useGetDepartmentsQuery({})
    const inputRef = useRef()

    const INIT_FORM_STATE = {
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        addressLine1:'',
        addressLine2:'',
        city: '',
        state:'',
        country: ''
    }
    const [dep, setDep ] = useState('')
    const url = 'http://localhost:3000/departments'
    useEffect(()=>{
        getAllDepartments()
    },[])

    const getAllDepartments = async () =>{
        // axios.get(`${url}`)
            await axios.get(`${url}`)
        .then((response)=>{
            const allDepartment = response.data
            setDep(allDepartment)
            console.log(typeof allDepartment);
        })
    }
    if ( isLoading || isFetching || !isSuccess || isError ) {
        return <div style={{marginTop: '70px'}} >Loading...</div>;
      }

      const getDepData =()=>{
        
      }
    const FORM_VALIDATION = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('invalid email').required('Required'),
        phone: Yup.number().integer().typeError('please inter a valid phone number').required('Required'),
        addressLine1:  Yup.string().required('Required'),
        addressLine2:  Yup.string(),
        city:  Yup.string().required('Required'),
        state:  Yup.string().required('Required'),
        country:  Yup.string().required('Required'),

    })
    if(dep){<div style={{marginTop:'70px'}}>Loading ...</div>
        // console.log(departments)
    }
        
        
        return (
           
            <div style={{marginTop:'70px'}}>
            { isSuccess ? (
                <Grid container>
                
                <Grid item xs={12}>
                <Container maxWidth="md">
                    <div>
                    <Formik
                        initialValues={{
                        ...INIT_FORM_STATE
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={values => {
                        console.log(values);
                        }}
                    >
                        <Form>
                        {console.log("valuse  = ")}
                        <Grid container spacing={2}>
        
                            <Grid item xs={12}>
                            <Typography>
                                Your details
                            </Typography>
                            </Grid>
        
                            <Grid item xs={6}>
                                <FormTextField
                                    name="firstName"
                                    label="First Name"
                                />
                            </Grid>
        
                            <Grid item xs={6}>
                            <FormTextField
                                name="lastName"
                                label="Last Name"
                            />
                            </Grid>
        
                            <Grid item xs={12}>
                            <FormTextField
                                name="email"
                                label="Email"
                            />
                            </Grid>
        
                            <Grid item xs={12}>
                            <FormTextField
                                name="phone"
                                label="Phone"
                            />
                            </Grid>
        
                            <Grid item xs={12}>
                            <Typography>
                                Address
                            </Typography>
                            </Grid>

                            <Grid item xs={12}>
                            <FormTextField
                                name="addressLine1"
                                label="Address Line 1"
                            />
                            </Grid>

                            <Grid item xs={12}>
                            <FormTextField
                                name="addressLine2"
                                label="Address Line 2"
                            />
                            </Grid>
                        
                            <Grid item xs={6}>
                            <FormTextField
                                name="city"
                                label="City"
                            />
                            </Grid>
                            
                            <Grid item xs={6}>
                            <FormTextField
                                name="state"
                                label="State"
                            />
                            </Grid>
                            
                            <Grid item xs={6}>
                            <FormSelect 
name="country"
label="Country"
options={dep}
/>
                           <select>
                           { departments && departments.map((item, index) =>{
                            return (
                            <option value={item.id} key={index}>{item.name}</option>
                            )
                           })}
                           </select>
                            </Grid>

                            <Grid item xs={12}>
                            <Typography>
                            Booking
                            </Typography>
                        </Grid>

                        </Grid>
        
                        </Form>
                    </Formik>
        
                    </div>
                </Container>
                </Grid>
                </Grid>
                ) 
    : '' }
            </div>
    
  ) 
}

export default OneEmployee

// <select >
        
//         {departments.map((item,index) => {
//             return (
//             <option key = {index} value={item.id} >{item.name}</option>
//             )
//         })}
//         </select>

// ---------------------------
// {departments ? (
//     <TextField 
// id="department"
// select
// fullWidth
// inputRef={inputRef}
// name="departmentsId"
// label="Department Name"

// value={departments.id ? departments.id : ''}
// >
// {departments.map((item,index) =>{
// return (
// // <li key={item.id}>{item.name}</li>
// <MenuItem key={index} value={item.id}>
// {item.name}
// </MenuItem>)
// })}
// </TextField>
//   ) : (
//     <p>No data available</p>
//   )}

// **********************
// <FormSelect 
// name="country"
// label="Country"
// options={dep}
// />
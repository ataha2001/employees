import { Box, Button, Container, Stack, Item, Paper, TextField, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, InputLabel, Select, MenuItem, Checkbox, IconButton, Divider, FormHelperText } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import Header from '../../components/Header/Header'
import styled from '@emotion/styled'
import logo from './1.png'
import { useTheme } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useGetDepartmentsQuery, useGetJobsQuery, useGetLocationsQuery, useGetSectionsQuery } from '../../services/jsonServerApi'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectAllDepartment } from '../../redux/departmentSlice'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormTextField from '../../components/FormUI/FormTextField/FormTextField'
import FormSelect from '../../components/FormUI/FormSelect/FormSelect'
import countries from '../../data/country.json'
import FormDate from '../../components/FormUI/FormDate/FormDate'
import FormCheckBox from '../../components/FormUI/FormCheckBox/FormCheckBox'
import FormButton from '../../components/FormUI/FormButton/FormButton'
const AddEmployee = () => {
    const theme = useTheme()
    
    const [empImg, setEmpImg ]= useState(logo)
    const INIT_FORM_STATE = {
        empName:'',
        email:'',
        phone:'',
        gender:'',
        bdate:'',
        address:'',

        departmentsId:'',
        sectionsId:'',
        levesId:'',
        jobsId:'',
        locationsId:'',
        insuranceNo:'',
        active:false,

        bsalary:'',
        
    }
    const FORM_VALIDATION = Yup.object().shape({
        
        empName: Yup.string().required('Required'),
        email: Yup.string().email('invalid email').required('Required'),
        phone: Yup.number().integer().typeError('please inter a valid phone number').required('Required'),
        bdate: Yup.date().max(new Date()).required('Required'),
        address:  Yup.string().required('Required'),
        
        departmentsId: Yup.string().required('Required'),
        sectionsId: Yup.string().required('Required'),
        levesId: Yup.string().required('Required'),
        jobsId: Yup.string().required('Required'),
        locationsId: Yup.string().required('Required'),
        insuranceNo: Yup.string().required('Required'),
        active: Yup.boolean().oneOf([true], "Must accepted").required("Must accepted") ,
        
        bsalary:Yup.number().integer().required('Required'),
        
        // bsalary: Yup.number().integer().typeError('please inter a valid phone number').required('Required'),
        
        // addressLine2:  Yup.string(),
        // city:  Yup.string().required('Required'),
        // state:  Yup.string().required('Required'),
        // country:  Yup.string().required('Required'),

    })
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setEmpImg(URL.createObjectURL(img));
            // setValues({...values, image:empImg})
            console.log(img)
        }
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

        
    
    return (
    
      <Box m="4rem 2.5rem" bgcolor="" mb="0" pb="15px">
      
      <FlexBetween>
      <Header title="Add Employee" 
        // subtitle="add new employe details"
         />
        </FlexBetween>
        <Box sx={{backgroundColor:  theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}} p="10px">
            <Formik
                initialValues={{
                    ...INIT_FORM_STATE
                }}
                validationSchema={FORM_VALIDATION} 
                    onSubmit={values => {
                    // same shape as initial values
                    console.log("valuse in schema = ",values);
                  }}
            >
                <Form>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={9}>
                        <Typography variant='subtitle2'  >
                        Personal informations
                        </Typography>
                            {/* Name */}
                            <Item >
                                <FormTextField name="empName" label="Employee name" sx={{marginBottom:'15px'}} />
                                
                                <Grid container direction='row' columnSpacing={2} sx={{marginBottom:'15px'}}>
                                    {/* Email */}
                                    <Grid item  xs={6} >
                                        <FormTextField name="email" label="Email" />
                                    </Grid>         

                                    {/* Phone */} 
                                    <Grid item xs={6} >
                                        <FormTextField name="phone" label="Phone" />
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' columnSpacing={2} sx={{marginBottom:'15px'}}>
                                    {/* Gender */}
                                    <Grid item  xs={6} >
                                        
                                    </Grid>          
                                    {/* B. Date */}
                                    <Grid item xs={6} >
                                        <FormDate name='bdate' label="Birth Date" />
                                    </Grid>
                                </Grid>
                                {/* Address */}
                                <TextField size="small" fullWidth id="address" 
                                    label="Address" name="address" variant="outlined" sx={{marginBottom:"20px"}}
                                    // value={values.address}
                                    // onChange={(e) => 
                                    //     setValues({...values, [e.target.name]  : e.target.value })
                                    // } 
                                    />

                            </Item>
                        </Grid>
                        
                        <Grid item xs={12}>
                            
                            <Item>
                                <FormButton  sx={{marginRight:"20px"}} >Submit</FormButton>
                                <Button variant='outlined' sx={{marginRight:"20px"}}>cancel </Button>
                                <Button variant='outlined'>Reset </Button>
                            </Item>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    <Box  >
                        
</Box>
</Box>
)
}
                    // <Button variant='outlined' sx={{marginRight:"20px"}} >Add</Button>



export default AddEmployee
                    // <Grid item xs={3}  >
                    //     <Item sx={{justifyContent:'space-around'}} >
                    //         <Card sx={{ maxWidth: 345, height:'235px' }}>
                    //             <CardActionArea>
                    //                 <CardMedia
                    //                     component="img"
                    //                     height="180"
                    //                     image={empImg}
                    //                     alt="green iguana"
                    //                     width="140"
                    //                 />
                    //             </CardActionArea>
                    //             <CardActions>
                    //                 <Button
                    //                 variant="contained"
                    //                 component="label"
                    //                 color="secondary"
                    //                 // sx={{backgroundColor:theme.palette.text.secondary}}
                    //                 // bgColor="secondary" 
                    //                 >
                    //                 Upload Image
                    //                 <input
                    //                     type="file"
                    //                     hidden
                    //                     onChange={onImageChange}
                    //                 />
                    //                 </Button>
                    //             </CardActions>
                    //         </Card>     
                    //     </Item>
                    // </Grid>
                    
                    // <Grid item xs={12}>
                    // <Typography variant='subtitle2' >
                    // Job informations
                    // </Typography>
                    //     <Item>
                    //         <Grid container columnSpacing={1} pr={1}>
                    //             {/* Departments */}
                    //             <Grid item xs={3}>
                    //             <FormSelect name='departmentsId' label='Country' options={countries} />
                                    
                    //             </Grid>
                    //             { /* Sections */}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //             { /* Levle */}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //             {/*  Jobs*/}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //         </Grid>

                    //         <Grid container columnSpacing={1} pr={1}>
                    //         {/* Location */}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //             {/* J Date */}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //             {/* Insurance No */}
                    //             <Grid item xs={3}>
                                    
                    //             </Grid>
                    //             {/* checkBox */}
                    //             <Grid item xs={3}>
                    //                 <FormCheckBox name="active" legend="Active" color='secondary' label="Active" />
                    //             </Grid>
                    //         </Grid>
                    //     </Item>
                    // </Grid>
                    // {/* Basic Salary */}
                    // <Grid item xs={12}>
                    //     <Typography variant='subtitle2' >
                    //     Salary informations
                    //     </Typography>
                    //     <Item>
                    //         {/* Basic Salary */}
                    //         <Grid>
                    //         <FormTextField name="bsalary" label="Basic Salary" />
                    //         </Grid>

                    //     </Item>
                    //     <Item>
                    //         <Grid container direction='row' columnSpacing={2}>
                    //         <Grid item xs={6} sx={{textAlign:'start'}}  >
                    //             <Button startIcon={<AddOutlinedIcon />}  variant='contained' color="secondary" sx={{marginBottom:'15px', marginLeft:'5px'}}>Add Benefit</Button>
                    //             <Grid  sx={{textAlign:'start', width:'100%'}}  >
                    //             </Grid>   
                    //         </Grid>
                        
                    //         <Grid item xs={6} sx={{textAlign:'start'}}  >
                    //         <Button  >+ Add Deduction</Button>
                    //         <TextField size="small" fullWidth id="outlined-basic" label="Basic Salary" variant="outlined" sx={{marginBottom:"20px"}} />
                    //         </Grid>
                    //         </Grid>

                    //     </Item>
                    // </Grid>
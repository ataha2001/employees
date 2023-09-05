import { Box, Button, Paper, TextField, Grid, Card, CardActionArea, CardMedia, Typography, CardActions, IconButton, Container,} from '@mui/material'
import React, { useEffect, useState, useRef,  } from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import Header from '../../components/Header/Header'
import styled from '@emotion/styled'
import logo from './default-profile-picture.png'
import { useTheme } from '@emotion/react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useCreateEmployeeMutation, useGetBenefitsQuery, useGetDeductionsQuery, useGetDepartmentsQuery, useGetJobsQuery, useGetLevelsQuery, useGetLocationsQuery, useGetSectionsQuery } from '../../services/firebaseApi'

import { useSelector } from 'react-redux'
import { selectAllDepartment } from '../../redux/departmentSlice'

import { Formik, Form, FieldArray, Field, useFormikContext, useFormik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FormTextField from '../../components/FormUI/FormTextField/FormTextField'
import FormSelect from '../../components/FormUI/FormSelect/FormSelect'
import FormDate from '../../components/FormUI/FormDate/FormDate'
import FormCheckBox from '../../components/FormUI/FormCheckBox/FormCheckBox'
import FormButton from '../../components/FormUI/FormButton/FormButton'
import FormRadioGroup from '../../components/FormUI/FormRadioGroup/FormRadioGroup'
import FormFile from '../../components/FormUI/FormFile/FormFile'
import FormError from '../../components/FormUI/FormError/FormError'
import { useNavigate } from 'react-router-dom'

const emptyAdditional = {id:'', amount: 0}
let renderCount = 0


const AddEmployee = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [createData ] = useCreateEmployeeMutation();
    const {data: departments } = useGetDepartmentsQuery()
    const {data: jobs } = useGetJobsQuery()
    const {data: levels } = useGetLevelsQuery()
    const {data: sections } = useGetSectionsQuery()
    const {data: locations } = useGetLocationsQuery()
    const {data: benefits } = useGetBenefitsQuery()
    const {data: deductions } = useGetDeductionsQuery()

    const [empImg, setEmpImg ]= useState(logo)
    // const { setFieldValue } = useFormikContext()
    // const formik = useFormik()
    const SUPPORT_FORMAT = ['image/png', 'image/jepg', 'image/jpg']
    const INIT_FORM_STATE = {
        id:0,
        empName:'',
        email:'',
        phone:'',
        gender:'',
        bdate:'',
        address:'',
        file: null,

        departmentsId:'',
        sectionsId:'',
        levelsId:'',
        jobsId:'',
        locationsId:'',
        insuranceNo:'',
        active:false,

        bsalary:'',
        // benefitId:'',
        // benefitAmount:'',
        benefits:[emptyAdditional],
        deductions:[emptyAdditional],

    }
    const FORM_VALIDATION = Yup.object().shape({
        
        empName: Yup.string().required('Required'),
        // email: Yup.string().email('invalid email').required('Required'),
        // phone: Yup.number().integer().typeError('please inter a valid phone number').required('Required'),
        // bdate: Yup.date().max(new Date()).required('Required'),
        // gender: Yup.string().required('Required'),
        // address:  Yup.string().required('Required'),
        // image: Yup.mixed().required('Required..!'),
        file: Yup.mixed().nullable().required("Required")
        .test(
            "FILLE_SIZE",
            "Uploaded file too big.",
            (value) => !value || (value && value.size <= 1024 * 1024    )
        )
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsupported format",
            (value) => !value || (value && SUPPORT_FORMAT.includes(value?.type)    )
        )
        
        // departmentsId: Yup.string().required('Required'),
        // sectionsId: Yup.string().required('Required'),
        // levelsId: Yup.string().required('Required'),
        // jobsId: Yup.string().required('Required'),
        // locationsId: Yup.string().required('Required'),
        // jdate: Yup.date().max(new Date()).required('Required'),
        // insuranceNo: Yup.string().required('Required'),
        // active: Yup.boolean().oneOf([true], "Must accepted").required("Must accepted") ,
        
        // bsalary:Yup.number().integer().required('Required'),
       
        //   benefits: Yup.array().of(
        //     Yup.object().shape({
        //         id:Yup.string().required("Required"),
        //         amount: Yup.number().min(1, 'amount must be more than 0 ').max(10000, 'amount must be less than 10,000').required("Required")
        //     })
        //   )
        
        // addressLine2:  Yup.string(),
        // city:  Yup.string().required('Required'),
        // state:  Yup.string().required('Required'),
        // country:  Yup.string().required('Required'),

    })
    const onImageChange = event => {
        // const value  = evt.target.value
        // console.log('render in radio group')
        // setFieldValue(name, value)
        if (event.target.files && event.target.files[0]) {
            let value = event.target.files[0];
            setEmpImg(URL.createObjectURL(value));
            // setValues({...values, image:empImg})
            console.log(value)
            // setFieldValue('image', value)
        }
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

        renderCount++
    return (
    
      <Box m="4rem 1.5rem" bgcolor="" mb="0" pb="15px">
      
        <FlexBetween sx={{paddingLeft:'15px', marginLeft:'15px'}}>
            <Header title="Add Employee"  
            // subtitle="add new employe details" // m="4rem 2.5rem"
            />
            <h2>Form render = {renderCount}</h2>
            </FlexBetween>
        <Box sx={{backgroundColor:  theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}} pt="10px">

            <Formik
    //         validateOnBlur={false}
    //   validateOnChange={false}
    //   enableReinitialize={false}
                initialValues={{
                    ...INIT_FORM_STATE
                }}
                validationSchema={FORM_VALIDATION} 
                    // onSubmit= async {values => {
                    onSubmit={values => {
                    // same shape as initial values
                    // setFieldValue('image', empImg)
                    console.log("valuse in schema = ",values);
                    createData(values)
                    navigate('/employees')
                  }}
                  onchange={values =>{
                    console.log("valuse  = ",values);
                  }}
            >
            {({ values, setFieldValue }) => (
                
                <Form>
                {console.log("valuse  = ",values)}
                <Container>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid container columnSpacing={2} sx={{marginLeft: '15px'}}>
                            <Grid item xs={9}>
                                <Typography variant='subtitle2'  >
                                 Personal informations
                                </Typography>
                                {/* Name */}
                                <Item >
                                   
                                    <FormTextField name="id" label="Employee Id" sx={{marginBottom:'15px'}} />
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
                                            <FormRadioGroup name="gender" legend='Gender' labelFirst="Male" labelSecond="Female"   />
                                        </Grid>          
                                        {/* B. Date */}
                                        <Grid item xs={6} >
                                            <FormDate name='bdate' label="Birth Date" />
                                        </Grid>
                                    </Grid>
                                    {/* Address */}
                                    <FormTextField name="address"  label="Address" />

                                </Item>
                            </Grid>
                            <Grid item xs={3}   >
                                <Item sx={{justifyContent:'space-around', marginTop:'20px'}} >
                                {/* 
                                    <Card sx={{ maxWidth: 345, height:'235px' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={empImg}
                                                alt="green iguana"
                                                width="140"
                                            />
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                            variant="contained"
                                            component="label"
                                            color="secondary"
                                            // sx={{backgroundColor:theme.palette.text.secondary}}
                                            // bgColor="secondary" 
                                            >
                                            Upload Image
                                            <input
                                                type="file"
                                                hidden
                                                onChange={onImageChange}
                                                // onChange={(e)=> setFieldValue('image', e.target.files[0])}
                                            />
                                            </Button>
                                        </CardActions>
                                    </Card>     
                                    */}
                                    
                                    <FormFile myfile={values.file} name="file"  /> 
                                  
                                    <FormError name="file" />
                                </Item>
                            </Grid>
                        </Grid>   
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' >
                            Job informations
                            </Typography>
                            <Item>
                                <Grid container columnSpacing={1} pr={1}>
                                     {/*  Jobs*/}
                                     <Grid item xs={3}>
                                        <FormSelect name='jobsId' label='Job' options={jobs ? jobs : ''} /> 
                                       
                                     </Grid>
                                     { /* Levle */}
                                    <Grid item xs={3}>
                                        <FormSelect name='levelsId' label='Level' options={levels ? levels : ''} /> 
                                    </Grid>
                                    
                                    { /* Sections */}
                                    <Grid item xs={3}>
                                    <FormSelect name='sectionsId' label='Section' options={sections ? sections : ''} /> 
                                    </Grid>
                                    {/* Departments */}
                                    <Grid item xs={3}>
                                       <FormSelect name='departmentsId' label='Department' options={departments ? departments : ''} />
                                    </Grid>   
                                </Grid>
    
                                <Grid container columnSpacing={1} pr={1} sx={{marginTop:'15px'}}>
                                {/* Location */}
                                    <Grid item xs={3}>
                                        <FormSelect name='locationsId' label='Location' options={locations ? locations : ''} />
                                    </Grid>
                                    {/* J Date */}
                                    <Grid item xs={3}>
                                    <FormDate name='jdate' label="Join Date" />
                                    </Grid>
                                    {/* Insurance No */}
                                    <Grid item xs={3}>
                                        <FormTextField name='insuranceNo' label='Insurance No' />
                                    </Grid>
                                    {/* checkBox */}
                                    <Grid item xs={3}>
                                        <FormCheckBox name="active" legend="" color='secondary' label="Active" />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                        {/* Basic Salary */}
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' >
                            Salary informations
                            </Typography>
                            <Item>
                                {/* Basic Salary */}
                                <Grid>
                                <FormTextField name="bsalary" label="Basic Salary" />
                                </Grid>
    
                            </Item>
                            <Item sx={{marginTop:'10px'}}>
                                <Grid container direction='row' columnSpacing={2}>
                                    {/* Benefits */}
                                    <Grid item xs={6} sx={{textAlign:'start'}}  >
                                        
                                        <Grid item>
                                        <FieldArray name='benefits'>
                                        {({ insert, remove, push ,}) => (
                                            
                                                <Grid container sx={{textAlign:'start', width:'100%'}} columnSpacing={1} >
                                                <Button onClick={() => push(emptyAdditional)} startIcon={<AddOutlinedIcon />}  variant='contained' color="secondary" sx={{marginBottom:'15px', marginLeft:'5px'}}>
                                                    Add Benefit
                                                </Button>
                                                {values.benefits.length > 0 && 
                                                    values.benefits.map((benefit, index)=>(
                                                    
                                                    <Grid container sx={{marginLeft: '0', textAlign:'start', display:'flex', width:'100%', marginBottom:'15px'}} key={index} spacing={1} >
                                                        <Grid item xs={7} >
                                                            <FormSelect 
                                                            // name={`benefits.${index}.benefitsId`} 
                                                            name={`benefits[${index}].id`} 
                                                            label="Benefit" options={benefits ? benefits : ''} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                        <FormTextField 
                                                        // name={`benefits.${index}.amount`} 
                                                        name={`benefits[${index}].amount`} 
                                                        type='number'
                                                        label="Amount"  />   
                                                        </Grid>
                                                        <Grid item xs={1} sx={{textAlign:'start', width:'100%'}}>
                                                        <IconButton  color="error" onClick={() => remove(index)}  sx={{ marginLeft:"0", marginTop:'11px',paddingLeft:'0' }} aria-label="directions">
                                                            <DeleteTwoToneIcon />
                                                        </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                        
                                                ))}

                                            
                                                </Grid>  
                                                    )}
                                            </FieldArray>
                                            </Grid>
                                    </Grid>
                                    {/* Deduction */}                    
                                    <Grid item xs={6} sx={{textAlign:'start'}}  >
                                        
                                        <Grid item>
                                        <FieldArray name='deductions'>
                                        {({ insert, remove, push ,}) => (
                                            
                                                <Grid container sx={{textAlign:'start', width:'100%'}} columnSpacing={1} >
                                                <Button onClick={() => push(emptyAdditional)} startIcon={<AddOutlinedIcon />}  variant='contained' color="secondary" sx={{marginBottom:'15px', marginLeft:'5px'}}>
                                                    Add Deduction
                                                </Button>
                                                {values.deductions.length > 0 && 
                                                    values.deductions.map((deduction, index)=>(
                                                    
                                                    <Grid container sx={{marginLeft: '0', textAlign:'start', display:'flex', width:'100%', marginBottom:'15px'}} key={index} spacing={1} >
                                                        <Grid item xs={7} >
                                                            <FormSelect 
                                                            // name={`deductions.${index}.deductionsId`} 
                                                            name={`deductions[${index}].id`} 
                                                            label="Deduction" options={deductions ? deductions : ''} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                        <FormTextField 
                                                        // name={`deductions.${index}.amount`} 
                                                        name={`deductions[${index}].amount`} 
                                                        type='number'
                                                        label="Amount"  />   
                                                        </Grid>
                                                        <Grid item xs={1} sx={{textAlign:'start', width:'100%'}}>
                                                        <IconButton  color="error" onClick={() => remove(index)}  sx={{ marginLeft:"0", marginTop:'11px',paddingLeft:'0' }} aria-label="directions">
                                                            <DeleteTwoToneIcon />
                                                        </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                        
                                                ))}

                                            
                                                </Grid>  
                                                    )}
                                            </FieldArray>
                                            </Grid>
                                    </Grid>
                            {/* 
                                    <Grid item xs={6} sx={{textAlign:'start'}}  >
                                    <Button  >+ Add Deduction</Button>
                                        
                                    <TextField size="small" fullWidth id="outlined-basic" label="Basic Salary" variant="outlined" sx={{marginBottom:"20px"}} />
                                    </Grid>
                            */}        
                                </Grid>
                            
                            </Item>
                        </Grid>
                        
                        <Grid item xs={12}>
                            
                            <Item>
                                <FormButton  sx={{marginRight:"20px"}} >Submit</FormButton>
                                <Button variant='outlined' sx={{marginRight:"20px"}} onClick={()=> navigate('/employees')} >cancel </Button>
                                <Button variant='outlined'>Reset </Button>
                            </Item>
                        </Grid>
                        
                    </Grid>
                </Container>    
                </Form>
                )}
            </Formik>
        </Box>
    <Box  >
                        
</Box>
    </Box>
)
}
                    // <Button variant='outlined' sx={{marginRight:"20px"}} >Add</Button>



export default AddEmployee
                   
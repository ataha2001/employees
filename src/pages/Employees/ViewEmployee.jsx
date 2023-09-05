import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Container, Grid, IconButton, Paper, Slide, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import { FieldArray, Form, Formik } from 'formik';
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormFile from '../../components/FormUI/FormFile/FormFile';
import FormError from '../../components/FormUI/FormError/FormError';
import FormTextField from '../../components/FormUI/FormTextField/FormTextField';
import FormDate from '../../components/FormUI/FormDate/FormDate';
import FormRadioGroup from '../../components/FormUI/FormRadioGroup/FormRadioGroup';
import FormCheckBox from '../../components/FormUI/FormCheckBox/FormCheckBox';
import FormSelect from '../../components/FormUI/FormSelect/FormSelect';
import { useCreateEmployeeMutation, useFetchEmployeeQuery, useGetBenefitsQuery, useGetDeductionsQuery, useGetDepartmentsQuery, useGetJobsQuery, useGetLevelsQuery, useGetLocationsQuery, useGetSectionsQuery } from '../../services/firebaseApi'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FormButton from '../../components/FormUI/FormButton/FormButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const emptyAdditional = {id:'', amount: 0}
let renderCount = 0

const ViewEmployee = () => {
    // console.log("row in update page " , row)
    const employeeId = useParams()
    const data = useSelector((state) => state.empData);

    // console.log(' data in update = ', data)
    const theme = useTheme()
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    // const [values, setValues] = useState(() =>
    //   columns.reduce((acc, column) => {
    //       acc[column.accessorKey ?? ''] = '';
    //       return acc;
    //     }, {}),
    //   );
    // const {data: employee, isSuccess, isLoading,  } = useFetchEmployeeQuery(employeeId ? employeeId : skipToken)
    const {data: employee, isSuccess, isLoading  } = useFetchEmployeeQuery(employeeId)
    const {data: departments } = useGetDepartmentsQuery()
    const {data: jobs } = useGetJobsQuery()
    const {data: levels } = useGetLevelsQuery()
    const {data: sections } = useGetSectionsQuery()
    const {data: locations } = useGetLocationsQuery()
    const {data: benefits } = useGetBenefitsQuery()
    const {data: deductions } = useGetDeductionsQuery()

    const [values, setValues ] = useState({})

    useEffect(() => {
         
        // const {data: employee, isSuccess, isLoading } = useFetchEmployeeQuery(employeeId)
          
            // const employee = await useFetchEmployeeQuery(employeeId);
            if(employee){
                setValues(employee)
                console.log('employee in sucsses' , employee)
            }

            // if(employee){

            //     setValues(employee);
                
            //     console.log('employee in effect' , employee)
            // }
      }, [employee,values]);
    
    //   if (!employee) {
    //     return <div style={{marginTop:'100px'}}>Loading...</div>;
    //   }

    const INIT_FORM_STATE = {
        id:'',
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
    
    if (isLoading ) {
      
        return (
          <Box m="4rem 2.5rem" mb='0' height='100vh' width="1000px" >
        
          <FlexBetween>
            <Header title="View Employee" subtitle="" />
          </FlexBetween>
          <Box sx={{textAlign: 'center'}}>
            <CircularProgress   color="secondary" />
          </Box>
          
          </Box>
    
        )}
        
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleChange =(isExpanded, panel)=>{
        setExpanded(isExpanded ? panel : false)
    }

    // if(employee){
    //     setValues(employee)
    //     console.log('employee in sucsses' , employee)
    // }
    renderCount++
  return (
    // <div style={{marginTop:'100px'}}>ViewEmployee</div>
    <Box m="4rem 1.5rem" bgcolor="" mb="0" pb="15px">
      
        <FlexBetween sx={{paddingLeft:'15px', marginLeft:'15px'}}>
            <Header title="View Employee"  
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
                    // ...values
                }}
                // validationSchema={FORM_VALIDATION} 
                //     // onSubmit= async {values => {
                //     onSubmit={values => {
                //     // same shape as initial values
                //     // setFieldValue('image', empImg)
                //     console.log("valuse in schema = ",values);
                //     createData(values)
                //     navigate('/employees')
                //   }}
                  onchange={values =>{
                    console.log("valuse  = ",values);
                  }}
                  //   {({ values, setFieldValue }) => (
                  >
               
                
                <Form>
                <Container  >
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Item style={{width:'100%', backgroundColor:''}} >
                            <Accordion
                                expanded ={ expanded === 'panel1'}
                                onChange={(e, isExpanded) => handleChange(isExpanded,'panel1')}    
                                sx={{ transitionDuration: '0.9s',}}
                                // TransitionProps={{ mountOnEnter: true, unmountOnExit: true, direction: 'down' }}
                                
                            >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{backgroundColor:'blueviolet', color:'white'}}
                                // bgcolor='secondary'
                                // backgroundColor='secondary'
                                // TransitionProps={{ mountOnEnter: true, unmountOnExit: true, direction: 'down' }}

                                >
                                    <Typography> Personal informations</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Slide in={expanded} direction="down" timeout={500}>
                                    <Grid container columnSpacing={2} sx={{marginLeft: 'px'}}>
                                        <Grid item xs={9}>
                                            
                                            {/* Name */}
                                            <Item >
                                            
                                                <FormTextField name="id" label="Employee Id" sx={{marginBottom:'15px'}} 
                                                    value={employee.id} disabled />
                                                 { /* <FormTextField name="empName" label="Employee name" sx={{marginBottom:'15px'}} />*/ }
                                                <FormTextField
                                                
                                                // onChange={(e) =>
                                                //     setValues({ ...values, [e.target.name]: e.target.value })
                                                // }
                                                // value={values.empName}
                                                
                                                // value={values.empName ? values.empName : ''}
                                                value={employee.empName ? employee.empName : ''}
                                                 name="empName" label="Employee name" sx={{marginBottom:'15px'}} />
                                            
                                                <Grid container direction='row' columnSpacing={2} sx={{marginBottom:'15px'}}>
                                                    {/* Email */}
                                                    <Grid item  xs={6} >
                                                        <FormTextField name="email" label="Email" value={employee.email}/>
                                                    </Grid>         
            
                                                    {/* Phone */} 
                                                    <Grid item xs={6} >
                                                        <FormTextField name="phone" label="Phone" value={employee.phone}/>
                                                    </Grid>
                                                </Grid>
            
                                                <Grid container direction='row' columnSpacing={2} sx={{marginBottom:'15px'}}>
                                                    {/* Gender */}
                                                    <Grid item  xs={6} >
                                                        <FormRadioGroup name="gender" legend='Gender' labelFirst="Male" labelSecond="Female" 
                                                          checked={employee.gender} />
                                                    </Grid>          
                                                    {/* B. Date */}
                                                    <Grid item xs={6} >
                                                        <FormDate name='bdate' label="Birth Date" value={employee.bdate}/>
                                                    </Grid>
                                                </Grid>
                                                {/* Address */}
                                                <FormTextField name="address"  label="Address" value={employee.address}/>
            
                                            </Item>
                                        </Grid>
                                        <Grid item xs={3}   >
                                            <Item sx={{justifyContent:'space-around', marginTop:'20px'}} >
                                            {/*replace card and send it to another component*/}
                                            <FormFile file={employee.file} name="file"  value={employee.file} /> 
                                            <FormError name="file" />
                                                
                                            
                                            </Item>
                                        </Grid>
                                    </Grid> 
                                </Slide>
                                </AccordionDetails>
                                <AccordionActions>
                                
                                </AccordionActions>
                            </Accordion>
                        </Item>
                        <Item style={{width:'100%', backgroundColor:''}} >
                            <Accordion
                                expanded ={ expanded === 'panel2'}
                                // TransitionProps={{ mountOnEnter: true, unmountOnExit: true, direction: 'down' }}
                                onChange={(e, isExpanded) => handleChange(isExpanded,'panel2')}    
                            >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{backgroundColor:'blue', color:'white', boxShadow:'2'}}
                                >
                                    <Typography>Job informations</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Slide in={expanded} direction="down" timeout={500}>
                                    <Grid item xs={12}>
                                    <Item>
                                        <Grid container columnSpacing={1} pr={1}>
                                             {/*  Jobs*/}
                                             <Grid item xs={3}>
                                                <FormSelect name='jobsId' label='Job' options={jobs ? jobs : ''} value={employee.jobsId}/> 
                                               
                                             </Grid>
                                             { /* Levle */}
                                            <Grid item xs={3}>
                                                <FormSelect name='levelsId' label='Level' options={levels ? levels : ''} value={employee.levelsId}/> 
                                            </Grid>
                                            
                                            { /* Sections */}
                                            <Grid item xs={3}>
                                            <FormSelect name='sectionsId' label='Section' options={sections ? sections : ''} value={employee.sectionsId}/> 
                                            </Grid>
                                            {/* Departments */}
                                            <Grid item xs={3}>
                                               <FormSelect name='departmentsId' label='Department' options={departments ? departments : ''} value={employee.departmentsId}/>
                                            </Grid>   
                                        </Grid>
            
                                        <Grid container columnSpacing={1} pr={1} sx={{marginTop:'15px'}}>
                                        {/* Location */}
                                            <Grid item xs={3}>
                                                <FormSelect name='locationsId' label='Location' options={locations ? locations : ''} value={employee.locationsId}/>
                                            </Grid>
                                            {/* J Date */}
                                            <Grid item xs={3}>
                                            <FormDate name='jdate' label="Join Date" value={employee.jdate}/>
                                            </Grid>
                                            {/* Insurance No */}
                                            <Grid item xs={3}>
                                                <FormTextField name='insuranceNo' label='Insurance No' value={employee.insuranceNo}/>
                                            </Grid>
                                            {/* checkBox */}
                                            <Grid item xs={3}>
                                                <FormCheckBox name="active" legend="" color='secondary' label="Active"  checked={employee.active}/>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                </Grid>
                                    </Slide>  
                                </AccordionDetails>
                                <AccordionActions></AccordionActions>
                            </Accordion>
                            
                        </Item>

                        <Item style={{width:'100%', backgroundColor:''}} >
                            <Accordion
                                expanded ={ expanded === 'panel3'}
                                // TransitionProps={{ mountOnEnter: true, unmountOnExit: true, direction: 'down' }}
                                onChange={(e, isExpanded) => handleChange(isExpanded,'panel3')}    
                            >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                sx={{backgroundColor:'green', color:'white', boxShadow:'2'}}
                                >
                                    <Typography>Salary informations</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Slide in={expanded} direction="down" timeout={500}>
                                            {/* Basic Salary */}
                                        <Grid item xs={12}>
                                        
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
                                                            {
                                                                employee.benefits.length > 0 && 
                                                                employee.benefits.map((benefit, index)=>(
                                                                
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
                                                            {employee.deductions.length > 0 && 
                                                                employee.deductions.map((deduction, index)=>(
                                                                
                                                                <Grid container sx={{marginLeft: '0', textAlign:'start', display:'flex', width:'100%', marginBottom:'15px'}} key={index} spacing={1} >
                                                                    <Grid item xs={7} >
                                                                        <FormSelect 
                                                                        // name={`deductions.${index}.deductionsId`} 
                                                                        name={`deductions[${index}].id ? deductions[${index}].id  : '' `} 
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
                                        
                                            </Grid>
                                        
                                        </Item>
                                        </Grid>
                                    </Slide>  
                                </AccordionDetails>
                                <AccordionActions></AccordionActions>
                            </Accordion>
                            
                        </Item>

                        <Grid item xs={12} >
                            <Item style={{paddingLeft:'0'}}>
                                <FormButton  sx={{marginRight:"20px"}} >Update</FormButton>
                                <FormButton  sx={{marginRight:"20px"}} >Delete</FormButton>
                                <Button variant='outlined' sx={{marginRight:"20px"}} onClick={()=> navigate('/employees')} >cancel </Button>
                            </Item>
                        </Grid>
                        
                    </Grid>
                </Container>    
                </Form>
                </Formik>
                </Box>
                <Box  >
                
                </Box>
                </Box>
                // )}
  )
}

export default ViewEmployee
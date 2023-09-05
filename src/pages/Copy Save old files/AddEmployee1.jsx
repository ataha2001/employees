import { Box, Button, Container, Stack, Item, Paper, TextField, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, InputLabel, Select, MenuItem, Checkbox, IconButton, Divider } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import Header from '../../components/Header/Header'
import styled from '@emotion/styled'
import logo from './1.png'
import { useTheme } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddIcon from '@mui/icons-material/Add';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useGetDepartmentsQuery, useGetJobsQuery, useGetLocationsQuery, useGetSectionsQuery } from '../../services/jsonServerApi'

const initValues={
        "id": 0,
        "name": "",
        "email": "",
        "phone": "",
        "gender" : "",
        "bdate": "",
        "address": "",
        "departmentsId": 0,
        "sectionId":0,
        "levelId":0,
        "locationId":0,
        "jdate":null,
        "insuranceNo": 0,
        "image":"",
        "active": false,
        "bSalary":0,
        "benefit": [{
            "id":0,
            "benefitsId":0,
            "amount":0
        }]
}


const AddEmployee = () => {
    const theme = useTheme()
    const [empImg, setEmpImg ]= useState(logo)
    const { data: departments } = useGetDepartmentsQuery()
    const { data: sections } = useGetSectionsQuery()
    // const { data: levels } = useGetLevelsQuery()
    const { data: jobs } = useGetJobsQuery()
    const { data: locations } = useGetLocationsQuery()
    const [depData, setDepData] = useState([])
    const [sectionsData, setSectionsData] = useState([])
    const [jobsData, setJobsData] = useState([])
    const [locationsData, setLocationsData] = useState([])
    const [values, setValues] = useState([initValues])
    
    const [checked, setChecked] = useState(false);
    const [benefitData, setBenefitData] = useState([])
    const inputRefName = useRef(null)
    const inputRefEmail = useRef(null)
    const inputRefPhone = useRef(null)
    const inputRefAddress = useRef(null)
    const inputRefInsucranceNo = useRef(null)
    const inputRefBSalary = useRef(null)
    const inputRefDepartmentsId = useRef(null)
    const inputRefGenderMale = useRef(null)
    const inputRefGenderFemale = useRef(null)
    const inputRefBDate = useRef(null)
    const inputRefJDate = useRef(null)

    useEffect(() => {
        
        
        if(departments) {
            setDepData(departments);
        }
        if(sections) {
            setSectionsData(sections);
        }
        if(jobs) {
            setJobsData(jobs);
        }     
        if(locations) {
            setLocationsData(locations);
        }  
        
      },[departments,sections,jobs,locations])


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setEmpImg(URL.createObjectURL(img));
            setValues({...values, image:empImg})
            console.log(img)
        }
    };
    const styles = {
        textField: {
            maxHeight: '50%',
          ".MuiList-root": {
            backgroundColor: "lightblue",
            
          },
        },
      };
    
   
    const handleCheckBoxChange = (e) => {
        setChecked(e.target.checked);
        setValues({ ...values, [e.target.name]: e.target.checked })
        // console.log('value = ', values)
      };
    const handleSubmit = ()=>{
        console.log("Submit Values = ", values)
        console.log(inputRefName.current.value)
        console.log( 'b date' , inputRefBDate.current.value)
        console.log( 'Male' , inputRefGenderMale.current.checked)
        console.log( 'Female' , inputRefGenderFemale.current.checked)
        let gender =""
            if( inputRefGenderMale.current.checked){
                gender = inputRefGenderMale.current.value
            }else if(( inputRefGenderFemale.current.checked)) {
                gender = inputRefGenderFemale.current.value

            }
        
        setValues({...values, 
            name:inputRefName.current.value, 
            email:inputRefEmail.current.value, 
            phone:inputRefPhone.current.value, 
            address:inputRefAddress.current.value, 
            insuranceNo:inputRefInsucranceNo.current.value, 
            bSalary:inputRefBSalary.current.value, 
            departmentsId:inputRefDepartmentsId.current.value, 

            gender: gender,
            bdate: inputRefBDate.current.value,
            jdate: inputRefJDate.current.value,
        })
        console.log("Submit Values = ", values)
    }  
    const handleAddBenefit=()=>{
        const abc= [...benefitData, []]
        setBenefitData(abc)
    }
    const handleDeleteBenefit =(i)=>{
        const deleteValue = [...benefitData]
        deleteValue.splice(i)
        setBenefitData(deleteValue)
    }
    const handleBenefitehangeValue = (index,target)=>{
        console.log('index =', index)
        console.log('target =', target)
        const newMedications = [...benefitData]
        newMedications[index][target.name] = target.value
        setBenefitData(newMedications)
        console.log('newMedications =',newMedications)
        // console.log('i =', i)
        // const inputData = [...benefitData]
        // inputData[i]= e.target.value
        // setBenefitData(inputData)
        // console.log('inputData =', inputData)
        // setValues({ ...values, [e.target.name[i]]: e.target.value })
        
    }
    return (
      // <TextField size="small"  fullWidth sx={{ marginBottom:"20px"}} id="outlined-basic" label="Email" variant="outlined"  />
    <Box m="4rem 2.5rem" bgcolor="" mb="0" pb="15px">
      <FlexBetween>
      <Header title="Add Employee" 
        // subtitle="add new employe details"
         />
        </FlexBetween>
        <Box sx={{backgroundColor:  theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}} p="10px">
        
       
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={9}>
                    {/* Name */}
                    <Item >
                        <TextField size="small" fullWidth id="name" 
                            label="Name" name="name" variant="outlined" sx={{marginBottom:"20px"}}
                            inputRef={inputRefName}
                             />
                        <Grid container direction='row' columnSpacing={2} >
                            {/* Email */}
                            <Grid item  xs={6} >
                                <TextField size="small" fullWidth id="email" 
                                    label="Email" name="email" variant="outlined" sx={{marginBottom:"20px"}}
                                    inputRef={inputRefEmail}
                                    />
                            </Grid>         
                            {/* Phone */} 
                            <Grid item xs={6} >
                                <TextField size="small" fullWidth id="phone" 
                                    label="Phone" name="phone" variant="outlined" sx={{marginBottom:"20px"}}
                                    inputRef={inputRefPhone}
                                    />
                            </Grid>
                        </Grid>
    {/* ref={(el) => (focusInput.current[index] = el)} */}
                        <Grid container direction='row' columnSpacing={2} >
                            {/* Gender */}
                            <Grid item  xs={6} >
                                <FormControl sx={{flexDirection: 'row', alignItems:'center',display:'flex'}}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{marginRight: '10px'}} >Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        // name="row-radio-buttons-group"
                                        name="gender"
                                        
                                        // value={values.gender}
                                        // onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
                                        >
                                        <FormControlLabel value="male" control={<Radio   />} label="Male" inputRef={inputRefGenderMale} />
                                        <FormControlLabel value="female" control={<Radio />} label="Female"  inputRef={inputRefGenderFemale} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>          
                            {/* B. Date */}
                            <Grid item xs={6} >
                                <FormControl sx={{ m: 1, minWidth: 120, width:'100%' }} size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Birth Date"
                                            name="bdate"
                                            // value={selectedBDate}
                                            inputRef={inputRefBDate}
                                            // onChange={(e) =>
                                            //     setValues({ ...values, [e.target.name]: e.target.value })
                                            // }
                                            // onChange={handleBDateChange }
                                            // renderInput={(props)=> <TextField {...props} />}
                                            slotProps={{textField : { variant: 'outlined' } }}
                                            />
                                    </LocalizationProvider>    
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Address */}
                        <TextField size="small" fullWidth id="address" 
                            label="Address" name="address" variant="outlined" sx={{marginBottom:"20px"}}
                            // value={values.address}
                            inputRef={inputRefAddress}
                            // onChange={(e) => 
                            //     setValues({...values, [e.target.name]  : e.target.value })
                            // } 
                            />

                    </Item>
                </Grid>
                <Grid item xs={3}  >
                    <Item sx={{justifyContent:'space-around'}} >
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
                                />
                                </Button>
                            </CardActions>
                        </Card>     
                    </Item>
                </Grid>
                
                <Grid item xs={12}>
                    <Item>
                        <Grid container columnSpacing={1} pr={1}>
                            {/* Departments */}
                            <Grid item xs={3}>

                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={departments}
                              label="Age"
                            //   onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {depData.map((item,index) => (
                                <MenuItem key={index} value={item.id }>
                                {item.name}
                                </MenuItem>
                                ))}
                              
                            </Select>
                          </FormControl>
                            { /*  
                                <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
                                    <TextField
                                        SelectProps={{
                                            MenuProps: {
                                              sx: styles.textField,
                                            },
                                          }}
                                        // sx={{maxHeight: '46px',}}
                                        id="departments55"
                                        select
                                        label="Department Name"
                                        name="departmentsId"
                                        inputRef={inputRefDepartmentsId ? inputRefDepartmentsId : ''}
                                        // defaultValue="Eru"
                                       
                                        // value={values.departmentId ? values.departmentId : ''}
                                        // value={inputRefDepartmentId.current.valueOf() ? inputRefDepartmentId.current.valueOf()  : '' }
                                        
                                        // onChange={(e)=> inputRefDepartmentsId.current = e.target.value}

                                        // helperText="Please select from the list"
                                        // key={column.accessorKey}
                                        // onChange={(e) =>
                                        //  setValues({ ...values, [e.target.name]: e.target.value })
                                        // }
                                        // onChange={(e) => setDepValue(e.target.value)}
                                        >
                                        {depData.map((item,index) => (
                                            <MenuItem key={index} value={item.id }>
                                            {item.name}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                            */}    
                            </Grid>
                            { /* Sections */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
                                    <TextField
                                        SelectProps={{
                                            MenuProps: {
                                            sx: styles.textField,
                                            },
                                        }}
                                        // sx={{maxHeight: '46px',}}
                                        id="departments"
                                        select
                                        label="Section Name"
                                        name="sectionsId"
                                        // defaultValue="Eru"
                                    
                                        value={values.sectionsId ? values.sectionsId : ''}
                                        // helperText="Please select from the list"
                                        // key={column.accessorKey}
                                        onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                        // onChange={(e) => setDepValue(e.target.value)}
                                        >
                                        {sectionsData.map((item,index) => (
                                            <MenuItem key={index} value={item.id }>
                                            {item.name}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            { /* Levle */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
                                    <TextField
                                        SelectProps={{
                                            MenuProps: {
                                            sx: styles.textField,
                                            },
                                        }}
                                        // sx={{maxHeight: '46px',}}
                                        id="departments"
                                        select
                                        label="Section Name"
                                        name="sectionsId"
                                        // defaultValue="Eru"
                                    
                                        value={values.sectionsId ? values.sectionsId : ''}
                                        // helperText="Please select from the list"
                                        // key={column.accessorKey}
                                        onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                        // onChange={(e) => setDepValue(e.target.value)}
                                        >
                                        {sectionsData.map((item,index) => (
                                            <MenuItem key={index} value={item.id }>
                                            {item.name}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            {/*  Jobs*/}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
                                    <TextField
                                        SelectProps={{
                                            MenuProps: {
                                            sx: styles.textField,
                                            },
                                        }}
                                        // sx={{maxHeight: '46px',}}
                                        id="jobs"
                                        select
                                        label="Job Name"
                                        name="jobsId"
                                        // defaultValue="Eru"
                                    
                                        value={values.jobsId ? values.jobsId : ''}
                                        // helperText="Please select from the list"
                                        // key={column.accessorKey}
                                        onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                        // onChange={(e) => setDepValue(e.target.value)}
                                        >
                                        {jobsData.map((item,index) => (
                                            <MenuItem key={index} value={item.id }>
                                            {item.name}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container columnSpacing={1} pr={1}>
                        {/* Location */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
                                    <TextField
                                        SelectProps={{
                                            MenuProps: {
                                            sx: styles.textField,
                                            },
                                        }}
                                        // sx={{maxHeight: '46px',}}
                                        id="locations"
                                        select
                                        label="Location"
                                        name="locationsId"
                                        // defaultValue="Eru"
                                    
                                        value={values.locationsId ? values.locationsId : ''}
                                        // helperText="Please select from the list"
                                        // key={column.accessorKey}
                                        onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                        // onChange={(e) => setDepValue(e.target.value)}
                                        >
                                        {locationsData.map((item,index) => (
                                            <MenuItem key={index} value={item.id }>
                                            {item.name}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            {/* J Date */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120, width:'100%' }} size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Joining Date"
                                            name="jdate"
                                            inputRef={inputRefJDate}
                                            // value={selectedJDate}
                                            // onChange={(e) =>
                                            //     setValues({ ...values, [e.target.name]: e.target.value })
                                            // }
                                            // onChange={handleJDateChange }
                                            // renderInput={(props)=> <TextField {...props} />}
                                            slotProps={{textField : { variant: 'outlined' } }}
                                            />
                                    </LocalizationProvider>    
                                </FormControl>
                            </Grid>
                            {/* Insurance No */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120, width:'100%' }} size="small">
                                    <TextField 
                                     id="insuranceNo"
                                     label="Insurance No."
                                     name="insuranceNo"
                                     value={values.insuranceNo}
                                     inputRef={inputRefInsucranceNo}
                                    //  onChange={(e) =>
                                    //     setValues({ ...values, [e.target.name]: e.target.value })
                                    // }
                                    />        
                                </FormControl>
                            </Grid>
                            {/* checkBox */}
                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120, width:'100%' }} size="small">
                                <FormControlLabel  control={
                                    <Checkbox checked={checked} color="secondary"
                                    // onChange={(e) => setChecked(!checked)}
                                    // label={column.header}
                                    // name={column.accessorKey}
                                    onChange={(e) =>handleCheckBoxChange(e)
                                    // setValues({ ...values, [e.target.name]: e.target.checked })
                                      }
                                      />
                                    } 
                                    // sx={{justifyContent:'center', border:'2px solid rgba(0, 0, 0, 0.87) ', marginLeft:'3px',marginRight:'3px', height:'55px', borderRadius:'5px', width:'100%'}}
                                    sx={{justifyContent:'center'}}
                                    label="Active"
                                    name='avtice'
                                    
                                
                                  />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <Grid>
                        <TextField size="small" fullWidth id="outlined-basic" label="Basic Salary" variant="outlined" sx={{marginBottom:"20px"}} 
                        inputRef={inputRefBSalary}
                        />
                        </Grid>

                    </Item>
                    <Item>
                        <Grid container direction='row' columnSpacing={2}>
                        <Grid item xs={6} sx={{textAlign:'start'}}  >
                            <Button startIcon={<AddOutlinedIcon />} onClick={handleAddBenefit} variant='contained' color="secondary" sx={{marginBottom:'15px', marginLeft:'5px'}}>Add Benefit</Button>
                            <Grid  sx={{textAlign:'start', width:'100%'}}  >
                            {benefitData.map((data, i)=>{
                                return( 
                                    <Box key={`benefit-${i}`} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                                    <TextField size="small" fullWidth 
                                    key={`benefit-${i}`}
                                    // key={`dosis-${i}`} 
                                    label="Basic Salary" variant="outlined" 
                                    sx={{marginBottom:"15px", width:'100%'}}
                                    name='benefit'
                                    value={data}
                                    // autoFocus
                                    onChange={(e)=>
                                         handleBenefitehangeValue(i, e.target)
                                        // setValues({...values, [e.target.name][i]: e.target.value})
                                        // setValues({ ...values, [e.target.name]: e.target.value })
                                        } />
                                    
                                    <IconButton onClick={()=> handleDeleteBenefit(i)} color="error"  sx={{ marginTop:'-15px', marginLeft:'0px', paddingLeft:'0' }} aria-label="directions">
                                        <DeleteTwoToneIcon />
                                    </IconButton>
                                    </Box>
                                    )
                                })}   
                            </Grid>   
                        </Grid>
                    
                        <Grid item xs={6} sx={{textAlign:'start'}}  >
                        <Button  >+ Add Deduction</Button>
                        <TextField size="small" fullWidth id="outlined-basic" label="Basic Salary" variant="outlined" sx={{marginBottom:"20px"}} />
                        </Grid>
                        </Grid>

                    </Item>
                </Grid>
                <Grid item xs={12}>
                    
                    <Item>
                        <Button variant='outlined' sx={{marginRight:"20px"}} onClick={handleSubmit}>Add</Button>
                        <Button variant='outlined' sx={{marginRight:"20px"}}>cancel </Button>
                        <Button variant='outlined'>Reset </Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
      <Box  >
     
      </Box>
    </Box>
  )
}



export default AddEmployee

            // <FormControl sx={{ m: 1, minWidth: 120 , width:'100%'}} size="small">
                                // <InputLabel id="demo-select-small-label">Deparment</InputLabel>
                                // <Select
                                // labelId="demo-select-small-label"
                                // id="demo-select-small"
                                // //   value={age}
                                // label="Age"
                                // //   onChange={handleCheckBoxChange}
                                // >
                                // <MenuItem value="">
                                //     <em>None</em>
                                // </MenuItem>
                                // <MenuItem value={10}>Ten</MenuItem>
                                // <MenuItem value={20}>Twenty</MenuItem>
                                // <MenuItem value={30}>Thirty</MenuItem>
                                // </Select>
                                // </FormControl>
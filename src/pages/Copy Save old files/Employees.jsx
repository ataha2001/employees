import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import FlexBetween from '../../components/flexBetween/FlexBetween';
import { useNavigate } from 'react-router-dom';
const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: `first_name` ,
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
  // {
  //   field: "last_name",
  //   headerName: "Last Name",
  //   flex: 0.5,
  // },
  {
    field: "age",
    headerName: "Age",
    flex: 0.5,
  },
  
  
  // {
  //   field: "job_title",
  //   headerName: "Job Title",
  //   flex: 1,
  // },
  // "imgage":"http://dummyimage.com/247x100.png/cc0000/ffffff"},
  // {
  //   field: "department",
  //   headerName: "Department",
  //   flex: 0.4,
  // },
  // {
  //   field: "salary",
  //   headerName: "Salary",
  //   flex: 0.4,
  // },
  // {
  //   field: "hire_date",
  //   headerName: "Hire Date",
  //   flex: 1,
  // },
  {
    field: "gender",
    headerName: "Gender",
    flex: 1,
  },
  
];
const data =[
{"id":1,
  "name":"Lyn",
  "job":"Speech Pathologist",
  "employee_id":1,
  "first_name":"Lezley",
  "last_name":"Varne",
  "age":23,
  "email":"lvarne0@dropbox.com",
  "job_title":"Human Resources Manager",
  "salary":33417.31,
  "hire_date":"9/8/2008",
  "gender":"Transsexual",
  "department":"Marketing",
  "imgage":"http://dummyimage.com/247x100.png/cc0000/ffffff"},
{"id":2,"name":"Francene","job":"Business Systems Development Analyst","employee_id":2,"first_name":"Jesse","last_name":"Bredbury","age":63,"email":"jbredbury1@wired.com","job_title":"Account Representative II","salary":36296.34,"hire_date":"9/6/2002","gender":"Cisgender","department":"Marketing","imgage":"http://dummyimage.com/138x100.png/5fa2dd/ffffff"},
]
const Employees = () => {
  const [employees, setEmployees] = useState({})
  const navigate = useNavigate()

    useEffect(()=>{
      const response = axios.get("http://localhost:3000/employes")
      .then(data => setEmployees(data.data)    )

    },[])

  return (
    <Box m="4rem 2.5rem" >
      <FlexBetween>
        <Header title="Employees" subtitle="List of Employees" />
        <Button variant="contained" onClick={()=> navigate('/addemployee')}>Add Employee</Button>
        <Button variant="contained" color="success" onClick={()=> navigate('/oneemployee')}>One Employee</Button>
        <Button variant="contained" color="secondary" onClick={()=> navigate('/newemployee')}>New Employee</Button>
      </FlexBetween>
      <Box  >
        <DataGrid
          loading={[] || !employees}
          getRowId={(row) => row.id}
          rows={employees || []}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Employees
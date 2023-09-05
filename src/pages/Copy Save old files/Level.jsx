import { Box, Button } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import LevelActions from './LevelActions'
import { grey } from '@mui/material/colors';
import axios from 'axios'
import { Delete, Edit } from '@mui/icons-material'


const Level = () => {
  const [levels, setLevels] = useState({})
  const [pageSize, setPageSize] = useState(2);
  const [rowId, setRowId] = useState(null);
  const navigate = useNavigate()
  const data =[]
  useEffect(()=>{
    const response = axios.get("http://localhost:3000/levels")
    .then(data => setLevels(data.data)    )

  },[])

  
  const columns = useMemo(
    () =>[
      
    {
      field:'id',
      headerName: "ID",
      //  flex: 0.5,
    },
    {
      field:'name',
      headerName: "Level Name",
      width: 170,
      editable: true,
      //  flex: 0.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      type: 'singleSelect',
      valueOptions: ['basic', 'editor', 'admin'],
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <>
        <LevelActions {...{ params, rowId, setRowId }} />
        <Edit sx={{color:'green',marginRight:'0px'}}/>
        <Delete colr="red" sx={{color:'red'}}/>
        </>
      ),
    },
    
  ],
  [rowId]
  )
  
  const handleAddLeve = async ()=>{
    const result = await axios.post(("http://localhost:3000/levels"),data);
  }
  
  return (
    
    <Box m="4rem 2.5rem" mb='0' height='100vh' width='900px' >
    
      <FlexBetween>
        <Header title="Levels" subtitle="List of Leves" />
        <Button variant="outlined" onClick={
          // ()=> {
          // navigate('/addemployee')
          handleAddLeve
        // }
        }>Add Level</Button>
      </FlexBetween>
      <DataGrid
        columns={columns}
        rows={levels}
        getRowId={(row) => row.id}
        // rowsPerPageOptions={[5, 10, 20]}
        // rowsPerPageOptions={[5, 10, 20]}
        // pageSizeOptions={[5, 10, 25]}
        pageSizeOptions={[2, 5]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
            theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
        // onCellEditCommit={(params) => {setRowId(params.id); console.log('rowId in commit', params.id)}}
        onCellEditStop={(params) => {setRowId(params.id); console.log('rowId in commit', params.id)}}
      />
    </Box>  
      
      )
  }
  
export default Level
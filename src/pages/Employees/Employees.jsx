import { Box, Button, Checkbox, CircularProgress, Skeleton, Tooltip } from '@mui/material'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import Header from '../../components/Header/Header'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {

  IconButton,

} from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import {  useGetEmployeesQuery,
          useCreateEmployeeMutation,
          useUpdateEmployeeMutation,
          useDeleteEmployeeMutation,
        } from '../../services/firebaseApi';
        import { CreateNewAccountModal } from '../../components/Modals/CreateModal/CreateNewAccountModal';
        import { UpdateAccountModal } from '../../components/Modals/UpdateModal/UpdateAccountModal';
import Notification from '../../components/Notifications/Notification';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '../../redux/dataSlice';
import { ViewEmployee } from './ViewEmployee';

const initValues = {
  id:0,
  name:"",
  notes:"",
  active:false
}



const Employees = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const { data: allEmployees, isLoading, isSuccess, } = useGetEmployeesQuery();
  const [createData ] = useCreateEmployeeMutation();
  const [updateData ] = useUpdateEmployeeMutation();
  const [deleteData ] = useDeleteEmployeeMutation();
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [activeData, setActiveData] = useState({});
  const [tableData, setTableData] = useState({});
  const [depData, setDepData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [notify, setNotify] = useState({isOpen:false, message: "", type:null})
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})

    useEffect(() => {
      if(allEmployees) {
        setTableData(allEmployees);
      }
      console.log('allEmployees',allEmployees)
      
    },[allEmployees])

    const handleCreateNewRow = (values) => {

        createData(values)
        setTableData([...tableData, values]);
        setNotify({
          isOpen: true,
          message: "Created Successfuly .....!",
          type:'success'
        })
      
      // tableData.push(values);
    };
  
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
      // console.log( 'edit values', values)
      if (!Object.keys(validationErrors).length) {
        // tableData[row.index] = values;
        const id = values.id
        updateData({ id , values})
        setNotify({
          isOpen: true,
          message: "Updated Successfuly .....!",
          type:'info'
        })
        // setTableData([...tableData, values]);
        // exitEditingMode()

      }
    };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleUpdate =(row)=>{
      console.log('row = ', row.original)
      const data =row.original 
      dispatch(setData(data));
      const id = row.original.id
      navigate(`/updateemployee/${id}`)
    }
    const handleDeleteRow = (
      (row) => {
        let id = row.getValue('id')
        // deleteData({id})
        setConfirmDialog({
          isOpen:true,
          title:`Are you sure you want to delete... ${row.getValue('name')}`,
          subTitle: "You con't undo this operation",
          onConfirm : ()=> {
            deleteData(id)
            setConfirmDialog({isOpen:false})
            setNotify({
              isOpen: true,
              message: "Deleted Successfuly .....!",
              type:'error'
            })
          }

        })
       
      
        setTableData([...tableData]);
      }
    );
    const getCommonEditTextFieldProps = useCallback(
      (cell) => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              
              cell.column.id === 'active'
                  ? validateActive(event.target.value)
                  : validateRequired(event.target.value);
            if (!isValid) {
              console.log("test ia not valid");
              //set validation error for cell if invalid
              setValidationErrors({
                ...validationErrors,
                [cell.id]: `${cell.column.columnDef.header} is required`,
              });
            } else {
              //remove validation error for cell if valid
              delete validationErrors[cell.id];
              setValidationErrors({
                ...validationErrors,
              });
            }
          },
        };
      },
      [validationErrors],
    );
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'id',
          header: 'ID',
          enableColumnOrdering: false,
          enableEditing: false, //disable editing on this column
          enableSorting: false,
          size: 80,
        },
        {
          accessorKey: 'empName',
          header: 'Employee Name',
          size: 140,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
          //Edit: ({ cell, column, table }) => <Autocomplete />,
        },
        {
          accessorKey: 'email',
          header: 'Email',
          size: 240,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
      
        },
        {
          accessorKey: 'phone',
          header: 'Phone',
          size: 240,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
      
        },
        {
          accessorKey: 'gender',
          header: 'Gender',
          size: 240,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
      
        },
        {
        accessorKey: 'active',
        header: 'Active',
        size: 140,
        
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type:'bool'
          
          
        }),
            //or in the component override callbacks like this
            Cell: ({ cell }) => {
            return <div><Checkbox color="secondary" checked={ cell.getValue() ? true : null} /> </div>;
            },
        
        },
      ],
      [getCommonEditTextFieldProps],
    );
      


    if (isLoading) {
      
      return (
        <Box m="4rem 2.5rem" mb='0' height='100vh' width="1000px" >
      
        <FlexBetween>
          <Header title="Employees" subtitle="" />
        </FlexBetween>
        <Box sx={{textAlign: 'center'}}>
        <CircularProgress   color="secondary" />
        </Box>
        
        </Box>
  
      )}
  const handleEditRow = (row) =>{
    setRowData(row.original)
    setUpdateModalOpen(true)
    
  }
  const handleViewRow = (row)=>{
    const data =row.original 
    dispatch(setData(data));
    const id = row.original.id
    navigate(`/viewemployee/${id}`)
  }
  return (
    // <Box m="4rem 2.5rem" mb='0' height='100vh' width="1000px" >
    <Box m="auto" mt='4rem' mb='0' height='100vh' width="1000px">
    
      <FlexBetween>
        <Header title="Employees" subtitle="" />
      </FlexBetween>

      <MaterialReactTable
      displayColumnDefOptions={{
        'mrt-row-actions': {
          muiTableHeadCellProps: {
            align: 'center',
          },
          size: 120,
        },
      }}
      columns={columns}
      data={tableData}
      editingMode="modal" //default
      // editingMode={UpdateLocationModal}
      enableColumnOrdering
      enableEditing
      
      // onEditingRowSave={handleSaveRowEdits}
      onEditingRowCancel={handleCancelRowEdits}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '0rem' }}>
          <Tooltip arrow placement="left" title="Edit">
      { /* <IconButton color='success' onClick={() => table.setEditingRow(row)}>*/}
            <IconButton color='success' onClick={() => handleUpdate(row)}>
              <ModeEditOutlineTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <DeleteTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="View">
            <IconButton color="primary" onClick={() => handleViewRow(row)}>
              <RemoveRedEyeTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Button
          color="secondary"
          // onClick={() => setCreateModalOpen(true)}
          onClick={()=> navigate('/addemployee')}
          variant="contained"
        >
          Create New Employee
        </Button>
      )}
    />
    <CreateNewAccountModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateNewRow}
      modalHead="Create New Employee"
      depData={depData}
      initValues={initValues}
    />

    
    <Notification 
        notify={notify}
        setNotify={setNotify}
    />
    <ConfirmDialog 
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
    />
      </Box>  
  )
}

const validateRequired = (value) => !!value.length;

const validateActive = (active) => {
 if(active === true || active === false ) return console.log("test is valid");

}


export default Employees
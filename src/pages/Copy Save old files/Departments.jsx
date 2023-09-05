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
import {   useGetDepartmentsQuery,  
    useCreateDepartmentMutation, 
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetDepartmentByIdQuery,

          
        } from '../../services/jsonServerApi';
import { CreateNewAccountModal } from '../../components/Modals/CreateModal/CreateNewAccountModal';
import { UpdateAccountModal } from '../../components/Modals/UpdateModal/UpdateAccountModal';
import Notification from '../../components/Notifications/Notification';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';

const Departments = () => {


  const { data: allDepartments, isLoading, isSuccess, } = useGetDepartmentsQuery();
  const [createData ] = useCreateDepartmentMutation();
  const [updateData ] = useUpdateDepartmentMutation();
  const [deleteData ] = useDeleteDepartmentMutation();
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [activeData, setActiveData] = useState({});
  const [tableData, setTableData] = useState({});
  const [depData, setDepData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [notify, setNotify] = useState({isOpen:false, message: "", type:""})
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})

    useEffect(() => {
      if(allDepartments) {
        setTableData(allDepartments);
      }
      console.log('allDepartments',allDepartments)
      
    },[allDepartments])

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
        updateData(values)
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
  
    const handleDeleteRow = (
      (row) => {
        let id = row.getValue('id')
        // deleteData({id})
        setConfirmDialog({
          isOpen:true,
          title:`Are you sure you want to delete... ${row.getValue('name')}`,
          subTitle: "You con't undo this operation",
          onConfirm : ()=> {
            deleteData({id})
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
          accessorKey: 'name',
          header: 'Department Name.',
          size: 140,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
          //Edit: ({ cell, column, table }) => <Autocomplete />,
        },
        {
          accessorKey: 'notes',
          header: 'Notes',
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
          <Header title="Departments" subtitle="" />
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

  return (
    <Box m="auto" mt='4rem' mb='0' height='100vh' width="1000px">
    
      <FlexBetween>
        <Header title="Departments" subtitle="" />
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
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
      { /* <IconButton color='success' onClick={() => table.setEditingRow(row)}>*/}
            <IconButton color='success' onClick={() => handleEditRow(row)}>
              
              <ModeEditOutlineTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <DeleteTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          Create New Department
        </Button>
      )}
    />
    <CreateNewAccountModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateNewRow}
      modalHead="Create New Department"
      depData={depData}
    />

    <UpdateAccountModal
      columns={columns}
      open={updateModalOpen}
      onClose={() => setUpdateModalOpen(false)}
      onSubmit={handleSaveRowEdits}
      modalHead="Update"
      depData={depData}
      rowData={rowData}
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


export default Departments
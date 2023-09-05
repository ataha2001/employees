import {    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";


//example of creating a mui dialog modal for creating new rows
export const UpdateAccountModal = ({ open, columns, onClose, onSubmit, modalHead, depData, rowData }) => {
 
  
  // const [depValue, setDepValue] = useState("")
  // console.log('departments',depData)
  const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
          acc[column.accessorKey ?? ''] = '';
          // console.log('ACC', acc)
          return acc;
        }, {}),
      );
      
    const [checked, setChecked] = useState(false);
    // console.log('values', values)
    useEffect(()=>{

      fetchData(rowData)
    }, [rowData])
    
    
    const fetchData =(rowData)=>{
      setValues(rowData)
      

    }
    // console.log('values in modal start ', values)
    // console.log('values.active in modal start ', values.active)
    const handleChange = (e) => {
      setChecked(e.target.checked);
      setValues({ ...values, [e.target.name]: e.target.checked })
      // console.log('value = ', values)
      
    };

    const handleSubmit = () => {
      //put your validation logic here
      // console.log('values id modal ',values)
      
      onSubmit({values});
     
      onClose();
    };
  
    return (

      <Dialog open={open}>
        <DialogTitle textAlign="center">{modalHead}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
                mt: '1rem'
              }}
            >
             
            {columns.map((column) => {
              return column.header === "Active" ?
                  <FormControlLabel key={column.accessorKey} control={
                    <Checkbox checked={values[column.accessorKey] ? values[column.accessorKey] : false} color="secondary"
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    // value={}
                    onChange={(e) =>handleChange(e)
                    // setValues({ ...values, [e.target.name]: e.target.checked })
                      }
                      />
                    } 
                    label={column.header}
                
                  />
              
                  : column.header === "Department Name" ?
                  
                  <TextField
                  id="outlined-select-currency"
                  select
                  label="Department Name"
                  name="departmentsId"
                  // defaultValue="Eru"
                  // value={depValue}
                  helperText="Please select from the list"
                  key={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                }
                  // onChange={(e) => setDepValue(e.target.value)}
                  >
                  {depData.map((item,index) => (
                    <MenuItem key={index} value={item.id }>
                    {item.name}
                    </MenuItem>
                    ))}
                    </TextField>
                  
                : 
                  <TextField

                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  disabled={column.header === "ID" ? true : false}
                  value={values[column.accessorKey]}
                  onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  />    
                    
                })
            } 



            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import React from 'react'

const FormProgress = () => {
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
                      <Checkbox checked={values[column.accessorKey] ? values[column.accessorKey] : false} 
                      color="secondary"
                      key={column.accessorKey}
                      label={column.header}
                      name={column.accessorKey}
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
                   onChange={(e) =>
                       setValues({ ...values, [e.target.name]: e.target.value })
                   }
                   />    
                    
                })} 
            

            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Create 
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default FormProgress
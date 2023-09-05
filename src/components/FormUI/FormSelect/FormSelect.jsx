import { TextField, MenuItem } from '@mui/material'
import React from 'react'
import { useField, useFormikContext } from 'formik'

const FormSelect = ({name, options, ...otherProps }) => {

    const { setFieldValue } = useFormikContext();
    const [field, meta ] = useField(name)

    const handleChange= ( evt )=>{
        const { value } = evt.target
        setFieldValue(name,value)
        // console.log("on change value = ",value)
    }
    const configSelect ={
        ...field,
        ...otherProps,
        select: true,
        fullWidth: true,
        variant: 'outlined',
        onChange: handleChange,
    }
    if(meta && meta.touched && meta.error ){
        configSelect.error = true
        configSelect.helperText = meta.error
    }
    // console.log(typeof options,'in form stsect');
    // <FormControl sx={{ m: 1, minWidth: 120,  width:'100%', textAlign:'start',  }} size="small">
  return (
    <TextField {...configSelect} sx={{textAlign:'start',}}>
        {Object.keys(options).map((item, pos) => {
            return (
                <MenuItem key={pos} value={item} >
                {options[item].name}
                </MenuItem>
            )
        })}
     </TextField>
  )
}

export default FormSelect
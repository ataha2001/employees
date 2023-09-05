import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'


const FormDate = ({ name, ...otherProps}) => {
  
const [field, meta ] = useField(name)

  const configDate = {
    ...field,
    ...otherProps,
    type: 'date',
    fullWidth: true,
    variant : 'outlined',
    InputLabelProps: {
        shrink: true,
    }
  }
  if(meta && meta.touched && meta.error ){
    configDate.error = true
    configDate.helperText = meta.error
}
  
    return (
    <TextField {...configDate} />
  )
}

export default FormDate
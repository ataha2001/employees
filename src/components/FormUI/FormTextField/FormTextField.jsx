import { TextField } from '@mui/material'
import React from 'react'
import { useField } from 'formik'

const FormTextField = ({ name, ...otherProps }) => {
    console.log('field Prop', name)
    console.log('field Prop other', otherProps)
    const [ field, meta ] = useField(name)

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant : 'outlined'
    }

    if (meta && meta.touched && meta.error){
        configTextField.error = true
        configTextField.helperText = meta.error
    }
  return (
      <TextField {...configTextField} />
   
  )
}

export default FormTextField
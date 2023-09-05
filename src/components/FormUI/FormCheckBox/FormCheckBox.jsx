import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material'
import React from 'react'
import { useField, useFormikContext } from 'formik'

const FormCheckBox = ({name,label, legend, ...otherProps}) => {
    const { setFieldValue } = useFormikContext()
    const {field, meta } = useField(name)
    
    const handleChange = evt =>{
        const { checked } = evt.target
        setFieldValue(name, checked)
    }
    const configCheckBox ={
        ...field,
        ...otherProps,
        onChange: handleChange,

  }
  const configFormContro = {}
  if(meta && meta.touched && meta.error ){
    configFormContro.error = true
    // configCheckBox.helperText = meta.error
}
    return (
    <FormControl {...configFormContro}>
        <FormLabel component='legend' >{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                control={<Checkbox {...configCheckBox} />}
                label={label}
            />
        </FormGroup>
    </FormControl>
  )
}

export default FormCheckBox
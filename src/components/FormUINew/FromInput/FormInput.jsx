import React from 'react'
import './formInput.css'
import { useField } from 'formik'


const FormInput = ({name,type, ...otherProps}) => {
    const [ field, meta ] = useField(name)

    
    const configInputField = {
        ...field,
        ...otherProps,
        // fullWidth: true,
        // variant : 'outlined'
    }

    if (meta && meta.touched && meta.error){
        configInputField.error = true
        configInputField.helperText = meta.error
    }

  return (
    <div class="input-group">
          <input className="input-field" {...configInputField} placeholder=''/>
          <label htmlFor={name} className="input-label"  {...configInputField}>{name}</label>
        </div>
  )
}

export default FormInput
import React from 'react'
// import './formInput.css'
import { useField } from 'formik'


const FormNewSelect = ({name,label, type,options, ...otherProps}) => {
    const [ field, meta ] = useField(name)

    
    const handleChange= ( evt )=>{
      const { value } = evt.target
      // setFieldValue(name,value)
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
  return (
    <div className="input-group-select">
      <select  autoFocus={false} className="input-field" {...configSelect} sx={{textAlign:'start',}}>
        <option value="" >{label}</option>
      {Object.keys(options).map((item, pos) => {
          return (
            <option key={pos} value={item} >
              {options[item].name}
            </option>
          // <input className="input-field" {...configInputField} placeholder=''/>
            )
        })}
        </select>
        <label htmlFor={name} className="input-label"  >{label}</label>
      </div>
      )
    }

export default FormNewSelect
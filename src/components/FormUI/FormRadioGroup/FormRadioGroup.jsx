import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { useField, useFormikContext } from 'formik'

const FormRadioGroup = ({name,labelFirst, labelSecond, legend, checked, ...otherProps}) => {
  const { setFieldValue } = useFormikContext()
  const {field, meta } = useField(name)
  const [selected, setSelected] = useState(checked);

  const isButtonSelected = (value) => {
    if (selected === value) {
        return true;
    }
};
const handleChange = evt =>{
  const value  = evt.target.value
  console.log('render in radio group')
  setFieldValue(name, value)
}

  const configRadio ={
    ...field,
    ...checked,
    ...otherProps,
    onChange: handleChange,

}

const configFormContro = {}
  if(meta && meta.touched && meta.error ){
    configFormContro.error = true
    // configCheckBox.helperText = meta.error
}
  return (
    <FormControl {...configFormContro} sx={{  display:'flex'}}>
        <FormLabel sx={{ textAlign:'start'}} id = "genderGroup" component='legend' >{legend}</FormLabel>
            <RadioGroup row aria-labelledby="genderGroup" >
                <FormControlLabel value='male' control={<Radio {...configRadio} />} label={labelFirst} 
                checked={isButtonSelected('male')} sx={{marginLeft:'20px'}}/>
                <FormControlLabel value='female' control={<Radio {...configRadio} />} label={labelSecond} 
                checked={isButtonSelected('female')}/>
        </RadioGroup>
    </FormControl>
  )
}

export default FormRadioGroup
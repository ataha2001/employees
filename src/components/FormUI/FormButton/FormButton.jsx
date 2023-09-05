import { Button } from '@mui/material'
import React from 'react'
import { useFormikContext } from 'formik'

const FormButton = ({children,...otherProps }) => {
    const { submitForm } = useFormikContext()

    const handleSubmit = () =>{
        console.log('we are in button submit')
        submitForm()
    }
    const configButton ={
        variant: 'outlined',
        color:'secondary',
        onClick: handleSubmit,
        // fullWidth: true,
        ...otherProps

    }
  return (
    <Button {...configButton} >
        {children}
    </Button>
  )
}

export default FormButton
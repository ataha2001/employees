import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Notification = (props) => {

    const {notify, setNotify} = props

    const handleClose= (event, reason) =>{
        if(reason === 'clickaway'){
            return
        }
        setNotify({
            ...notify,
            isOpen:false
        })
    }
  return (
    <Snackbar
        sx={{marginTop:'45px'}}
        open={notify.isOpen}
        autoHideDuration={2000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={handleClose}
    >
        <Alert severity={notify.type ? notify.type : 'error'} onClose={handleClose}>
        {notify.message}
        </Alert>
    </Snackbar>
  )
}

export default Notification
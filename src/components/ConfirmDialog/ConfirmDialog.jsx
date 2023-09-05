import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FlexBetween from '../flexBetween/FlexBetween';
import { NotListedLocation } from '@mui/icons-material';

const ConfirmDialog = (props) => {

  const { confirmDialog, setConfirmDialog} = props

  return (
    <Dialog open={confirmDialog.isOpen} >
      <DialogTitle sx={{ marginBottom: "20px", }}>
        <FlexBetween>
          <Typography variant="h6" color='error'>
            Confirm
          </Typography>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" 
            onClick={()=> setConfirmDialog({...confirmDialog, isOpen:false})}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </FlexBetween>
        <Box  sx={{textAlign:'center'}}>
        <IconButton disableRipple sx={{}}>
        <NotListedLocation sx={{fontSize:'6rem',backgroundColor:"pink",color:'red', borderRadius:'50%' }} />
        </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginBottom: "20px"}}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions sx={{marginBottom: '5px'}}>
        <Button color="primary" variant="outlined" sx={{ marginRight: "10px"}} 
          onClick={()=> setConfirmDialog({...confirmDialog, isOpen:false})}
        >
          No
        </Button>
        <Button color="secondary" variant="contained" sx={{ marginRight: "10px"}}
        onClick={confirmDialog.onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
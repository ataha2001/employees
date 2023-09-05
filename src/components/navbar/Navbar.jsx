import { AppBar, Avatar, Box, CssBaseline, Divider, IconButton, InputBase, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import FlexBetween from '../flexBetween/FlexBetween'
import SearchIcon from '@mui/icons-material/Search';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
// import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebase.config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { Logout, PersonAddAlt1Outlined, Settings } from '@mui/icons-material';



const Navbar = ({open, setOpen, mode, setMode}) => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userData);
    console.log('useData =', userDetails)
    const drawerWidth = 240
    
    const handleLogout = async ()=>{
        console.log('test');
        try {
            await signOut(auth)
            console.log("log out");
            
            dispatch(logout());
            localStorage.setItem('userDetails', JSON.stringify({ }));
            navigate('/end')
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (event) => {
        // setOpenMenu(event.currentTarget);
        setOpenMenu(!openMenu);
      };
      const handleClose = () => {
        setOpenMenu(null);
      };
      const handleShowProfile = ()=>{
        setOpenMenu(null);
        navigate(`viewuser/${userDetails.id}`)
      }
      
      const handleUpdateProfile = ()=>{
        setOpenMenu(null);
        navigate(`updateuser/${userDetails.id}`)
      }
  return (
      //   <Toolbar sx={{marginLeft: open ? `${drawerWidth}px` : 0, transition: '0.7s', justifyContent:'space-between' }} >
      //   <AppBar position="fixed" open={open} color='secondary'>
  <Box display="flex">
  <AppBar position="fixed" open={open} color='secondary'>
  <Toolbar sx={{marginLeft: open ? `${drawerWidth}px` : 0, transition: '0.7s', justifyContent:'space-between' }} >
    {/*LEFT*/}
    <FlexBetween>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=> setOpen(!open)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
        <FlexBetween 
                    // backgroundColor={theme.palette.background.alt}
                    // backgroundColor="yellow"
                    // backgroundColor="#eee"
                    // borderRadius="9px"
                    gap= "3rem"
                    p="0.1rem 1.5rem"
                >
                <span>Welcom: {userDetails.name}</span>
                </FlexBetween>

    </FlexBetween>
    {/*Right*/}
    <FlexBetween >
        
        <Tooltip title="change mode">
            <IconButton sx={{}} onClick={()=> setMode(mode === 'light' ? 'dark' : 'light')} >
            {mode === 'light' ?         
            <LightModeOutlined sx={{ fontSize: "25px" ,color:'white'}} /> 
            :
            <DarkModeOutlined sx={{ fontSize: "25px" ,color:'white'}} /> }
                        
            </IconButton>
        </Tooltip>
        <Tooltip title="User Menu" >
            <Avatar onClick={handleClick} 
            sx={{width: 35, height: 35, marginLeft:'5px', cursor:'pointer'}} 
            src={userDetails.image}
            />
        </Tooltip>
        <Tooltip title="Logout">
            <IconButton onClick={handleLogout} >
                <LogoutOutlinedIcon sx={{ fontSize: "25px" ,color:'white', marginLeft:'5px'}} />
            </IconButton>
        </Tooltip>
    </FlexBetween>
    </Toolbar>
    </AppBar>
    { openMenu ? (
        <Menu
        // anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 80,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{vertical: 'top', horizontal: 'right',}}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center',}}
        sx={{top:'40px'}}
      >
        <MenuItem onClick={handleShowProfile}>
          <Avatar src={userDetails.image} /> 
          Show Profile
        </MenuItem>
        <MenuItem onClick={handleUpdateProfile}>
          <ModeEditOutlineTwoToneIcon  color='success' sx={{marginRight:'10px', }} /> Update account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAddAlt1Outlined fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      ) : null}
    </Box>

  )
}

export default Navbar
// <Menu
//             id="basic-menu"
//             openMenu={openMenu}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//             'aria-labelledby': 'basic-button',
//             }}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               sx={{top:'50px'}}
//         >
//             <MenuItem onClick={handleClose}>Profile</MenuItem>
//             <MenuItem onClick={handleClose}>My account</MenuItem>
//             <Divider />
//             <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
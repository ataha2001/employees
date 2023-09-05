// import { styled, useTheme } from '@mui/material/styles';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';

// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { AppBar } from '@mui/material';
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    const [mode, setMode] = useState('light')
   

  const darkTheme = createTheme({
    palette: {
      mode:mode
    }
  })
  const [open, setOpen] = useState(true);
 


  return (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }} width="100%" height="100% + 64px">
            <Sidebar open={open} setOpen={setOpen}/>
            <Box flexGrow={1}>
                <Navbar
                open={open} setOpen={setOpen}
                mode={mode} setMode = {setMode}
                // handleLogout={handleLogout}
                
                />
                <Box bgcolor={darkTheme.palette.background.default} 
                color={darkTheme.palette.text.primary}>
                
                <Outlet  />
                </Box>
                
            </Box>
        </Box>
        </ThemeProvider>
        );
    }

export default Layout
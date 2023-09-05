import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled, useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WcIcon from '@mui/icons-material/Wc';
import GroupIcon from '@mui/icons-material/Group';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const sidebarData = [{
    id:1,
    title:'Dashboard',
    icon: <DashboardIcon />,
    path:'/dashboard'
    },
    {
        id:2,
        title:'Employee',
        icon: <WcIcon />,
        path:'/employees',
    },
    {
      id:3,
      title:'Users',
      icon: <GroupIcon />,
      path:'/users',
  },
    {
        id:4,
        title:'Payroll',
        icon: <MonetizationOnOutlinedIcon />,
        // path:'/payroll'
        path:'addemployee'
    },
]
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
const Sidebar = ({open, setOpen,}) => {
    const [active, setActive] = useState("");
    const navigate = useNavigate()
    const theme = useTheme();
    const handleDrawerClose = () => {
        setOpen(false);
      };
      const [openSub, setOpenSub] = useState(true);

  const handleClick = () => {
    setOpenSub(!openSub);
  };
 
  return (
    <Box>
    {open && (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography variant="h5" fontWeight="bold">
                HR System
            </Typography>
        </Box> 
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarData.map((item, index) => {
            const lcText = item.title.toLowerCase();
            return(
                <ListItem key={item.id} disablePadding>
                
                <ListItemButton onClick={()=>{
                        navigate(item.path); 
                        setActive(lcText)
                    }}
                    sx={{backgroundColor: active === lcText ? "#eeee" : "transparent",
                        // color: active === lcText ? "white" : "transparent" 
                    }}
                    >
                  <ListItemIcon>
            { /*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
        )})

        }
            
         
        
      </List>
      <Divider />
      {/* ============== */}
      
      {/* ============== */}
      <List>
        {['Reports', ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ArticleOutlinedIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SettingsSuggestOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {openSub ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSub} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("departments")}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Departments" sx={{color:''}} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("sections")}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Sections" sx={{color:''}} />
        </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("jobs")}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Jobs" sx={{color:''}}/>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("level")}>
            <ListItemIcon>
              <StairsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Levels"   sx={{color:''}} />
          </ListItemButton>
          
          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("locations")} >
            <ListItemIcon>
              <LocationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Locations"  sx={{color:''}}  />
          </ListItemButton>

         

          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("benefits")}>
            <ListItemIcon>
              <AddCircleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Benefits"  sx={{color:''}} />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("deductions")}>
            <ListItemIcon>
              <HighlightOffOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Deduction"  sx={{color:''}} />
          </ListItemButton>


        </List>
      </Collapse>
      </List>
      <Divider />
      
    </Drawer>
    )}
    </Box>
  )
}

export default Sidebar
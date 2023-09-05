import { useTheme } from '@emotion/react';
import { Box, Container, Grid } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setNewUser } from '../../redux/userSlice';
import CardData from '../../components/Card/CardData';
import FlexBetween from '../../components/flexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import DataUsageOutlinedIcon from '@mui/icons-material/DataUsageOutlined';
const tempCardData = [
  {
  title:"Users",
  amount:'51',
  icon:<DeleteTwoToneIcon />,
  path:"google.com",
  iconColor: 'red',
  toolTip:"Salary"
},
{
  title:"Employees",
  amount:'215',
  icon:<DeleteTwoToneIcon />,
  path:"google.com",
  iconColor: 'green',
  toolTip:"Salary"
},
{
  title:"Department",
  amount:'5',
  icon:<DeleteTwoToneIcon />,
  path:"google.com",
  iconColor: 'blue',
  toolTip:"Salary"
},
{
  title:"Jobs",
  amount:'45',
  icon:<DeleteTwoToneIcon />,
  path:"google.com",
  iconColor: 'orange',
  toolTip:"Salary"
},
]
const tempCircle = {
  title:"This year Salary",
  amount:'51',
  icon:<DataUsageOutlinedIcon />,
  path:"google.com",
  iconColor: 'orange',
  circel: true,
  toolTip:"Salary"
}
const tempChart = {
  title:"Monthly Salary",
  amount:'51',
  icon:<InsightsOutlinedIcon />,
  path:"google.com",
  iconColor: 'orange',
  chart: true,
  toolTip:"Monthly Salary"
}
const Dashboard = ({open, setOpen}) => {
    const theme = useTheme()
    const data = useSelector((state) => state.userData);
    
    // const dispatch = useDispatch();
    // dispatch(setNewUser("ashraf text"));
    // console.log('check userEmail in dash', data.userEmail)
    
  // console.log(theme)
    const drawerWidth = 240
    // console.log('open from dashboard = ', open)
  return (
    
    
    <Box m="auto" mt='4rem' mb='0' height='100vh' width="1000px">
    
      <FlexBetween>
        <Header title="Dashboard" subtitle="" />
      </FlexBetween> 

      <Grid  container rowSpacing={2} columnSpacing={2}>
      {tempCardData.map((card,index) =>{
        return (
          <Grid item  xs={4} md={3} sm={12} key={index}>
            <CardData card={card}  />
          </Grid>
        )
        
        })}
        
      </Grid>
      
      <Grid container rowSpacing={2} columnSpacing={2} mt={1}>
        <Grid item  xs={5} md={6} sm={12}>
          <CardData card={tempCircle}  />
        </Grid>
        <Grid item xs={7} md={6} sm={12}>
          <CardData card={tempChart}  />
        </Grid>
      </Grid>
            
    </Box>
    
  )
}

export default Dashboard;
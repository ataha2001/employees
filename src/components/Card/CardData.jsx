import React from 'react'
import FlexBetween from '../../components/flexBetween/FlexBetween'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Box, Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip as TooltipChart,
    ResponsiveContainer,
  } from "recharts";
  import './chart.css'
  
  const chartData = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];
  

const CardData = (props) => {
    const {card} = props
    // console.log('card', card)
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{  boxShadow: 2 }}>
      <CardContent sx={{ height : card.circel ? '290px' : ''}} >
        <Typography sx={{  fontWeight:'bold',marginTop:0, paddingTop:0 }} color={card.iconColor} gutterBottom>
          {card.title}
        </Typography>
        {card.circel? (
            <Box  sx={{width:'250px', height:'253px', margin:'auto' }} >
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5}  />
            </Box>
        ) : card.chart ? (
            <div>
                <div className="title"></div>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <AreaChart
                    width={730}
                    height={250}
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <TooltipChart />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        ) : (
        <Typography variant="h3" component="div" textAlign={'center'} color={card.iconColor}>
          {card.amount}
        </Typography>
        )}
      </CardContent>
      <CardActions  >
       <FlexBetween sx={{width:'100%'}}>
        <Button size="small">Show alll</Button>
        <Tooltip  title={card.toolTip}>
            <IconButton sx={{color:card.iconColor}} >
                {card.icon}
            </IconButton>
        </Tooltip>
        </FlexBetween>
   
        
       
      </CardActions>
    </Card>
  )
}

export default CardData

import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from './context';

const useStyles = makeStyles((theme) => ({
      gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
      paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
      },
    }));
const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
console.log("/////////////////");
console.log(name)
  return (
    <Grid container className={classes.gridContainer}>
      
     
            <video playsInline muted ref={myVideo} autoPlay style={{width:"300px",height:"200px",zIndex:"899",marginTop:"300px"}}/>
       
            <video playsInline ref={userVideo} autoPlay style={{width:"300px",height:"200px",zIndex:"899",marginTop:"600px"}} />
          
      
      
     
    </Grid >
  );
};

export default VideoPlayer;
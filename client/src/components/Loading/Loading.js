import React from "react";
import { Container, Grow, LinearProgress, Typography } from "@mui/material";
import logo4 from "../../resources/logo4.png";

import "./styles.css";

const Loading = ({ text }) => {
   return (
      <Grow in>
         <Container
            fullWidth
            style={{
               marginTop: "200px",
               alignItems: "center",
               justifyContent: "center",
               justifyItems: "center",
            }}
            className="loading-background"
         >
            <div>
               <img
                  src={logo4}
                  alt="Loading"
                  width="30%"
               />
            </div>
            <LinearProgress sx={{
               width: '30%', marginLeft: '35%', marginTop: '3%', color: '#007F12', height: 6, backgroundColor: '#e0e0e0',
               '& .MuiLinearProgress-bar': {
                  backgroundColor: '#468B50',
               }
            }} />
            <div style={{ marginTop: '60px' }}>
               <Typography variant="h2">{text}</Typography>
            </div>
         </Container>
      </Grow>
   );
};

export default Loading;




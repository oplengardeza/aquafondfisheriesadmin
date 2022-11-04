import { Typography, Button, Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import myImg from "../NotFound.gif";
function NotFound() {
  let navigate = useNavigate();
  
  return (
    <Box
      component={Grid}
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        padding: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexBasis: "50%",
        }}
      >
        <Typography variant='h1' color='error' sx={{ m: 1 }}>
          404
        </Typography>
        <Typography variant='h3' sx={{ m: 1 }}>
          Page Not Found
        </Typography>
        <Typography variant='h5' color='gray'>
          We're sorry, the page you requested could not be found.
        </Typography>
        <Typography variant='h5' color='gray'>
          Please go back to the pages available
        </Typography>
        <Button
          variant='contained'
          sx={{ m: 1, borderRadius: 20, width: 150, height: 50 ,background: (theme) =>`${theme.palette.primary.light}`}}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexBasis: "50%",
        }}
      >
        <img src={myImg} alt='NotFound' width={550} />
      </Box>
    </Box>
  );
}

export default NotFound;

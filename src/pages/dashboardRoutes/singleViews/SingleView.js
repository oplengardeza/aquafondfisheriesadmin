import { Typography, Box, Grid, Avatar, IconButton } from "@mui/material";
import React from "react";
import { deepOrange } from "@mui/material/colors";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function SingleView({ data }) {

  const onBack = () => {
    window.location.reload()
  }

  return (
    <Box>
      <IconButton sx={{ alignSelf: 'flex-start' }} onClick={onBack}>
        <ArrowBackIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Box sx={{
        padding: 10
      }}
        container component={Grid} justifyContent="center"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
          <Box container component={Grid} justifyContent="center">
            {data.photoURL === "" ?
              <Avatar sx={{ bgcolor: deepOrange[500], height: 130, width: 130, fontSize: 40, fontWeight: 'bold', boxShadow: 2 }}>{data.fullname.substring(0, 1)}</Avatar> :
              <Avatar src={data.photoURL} sx={{ height: 150, width: 150, boxShadow: 2 }} />
            }
          </Box>
          <Box container component={Grid} justifyContent="center" sx={{
            marginTop: 2
          }}>
            <Typography sx={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            }}>
              {data.fullname}
            </Typography>
          </Box>
          <Box container component={Grid} justifyContent="space-between" sx={{
            marginTop: 3,
            width: 500
          }}>
            <Box>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                Email
              </Typography>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                {data.email}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                Address
              </Typography>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                {data.address}
              </Typography>
            </Box>
          </Box>
          <Box container component={Grid} justifyContent="space-between" sx={{
            marginTop: 3,
            width: 500
          }}>
            <Box>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                Phone
              </Typography>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                {data.phone}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              }}>
                Has shop
              </Typography>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1,
                color: data.hasShop === true ? 'green' : 'red'
              }}>
                {data.hasShop === true ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SingleView;

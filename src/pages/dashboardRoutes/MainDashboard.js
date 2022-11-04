import { Grid, Icon, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../utils/firebase";
function MainDashboard() {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState();
  const [prodCount, setProdCount] = useState();
  const [shopCount, setShopCount] = useState();

  React.useEffect(() => {
    const q = query(collection(db, "shops"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setShopCount(data.length);
    });
    return unsubscribe;
  }, [navigate])

  React.useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setUserCount(data.length);
    });
    return unsubscribe;
  }, [navigate])

  React.useEffect(() => {
    const q = query(collection(db, "feedproducts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        })
      });
      setProdCount(data.length);
    });
    return unsubscribe;
  }, [navigate])


  const data = [
    {
      id: 0,
      label: "No. of Users",
      totalData: userCount,
      icon: <PeopleIcon />,
    },
    {
      id: 1,
      label: "No. of Shop",
      totalData: shopCount,
      icon: <StoreIcon />,
    },
    {
      id: 2,
      label: "No. of Products",
      totalData: prodCount,
      icon: <PeopleIcon />,
    },
  ];
  return (
    <Grid item xs={12}>
      <Grid container justifyContent='center' spacing={8}>
        {data.map((value) => (
          <Grid key={value.id} item>
            <Paper
              sx={{
                height: 120,
                width: 270,
                backgroundColor: "#FF9967",
                p: 2,
              }}
            >
              <Typography sx={{ color: "#000000", fontSize: 30 }}>
                {value.label}
              </Typography>
              <Icon>
                {value.icon}
              </Icon>
              <Typography sx={{ color: "#000000", fontSize: 36, }}>
                {value.totalData}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Users />
    </Grid>
  );
}

export default MainDashboard;

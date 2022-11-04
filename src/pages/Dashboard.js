import React, { useEffect } from "react";
import {
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import logo from "../assets/icon3.png";
import { Helmet } from "react-helmet";

const drawerWidth = 250;
const styles = {
  root: {
    display: "flex",
  },
  drawerContainer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      background: "#FF9967",
    },
  },
  menuItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0px 20px 0px",
    "&:hover": {
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      backgroundColor: "white",
      margin: "20px 0px 20px 0px",
    },
    cursor: 'pointer'
  },
  menuItemContainerActive: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "white",
    margin: "20px 0px 20px 0px",
    cursor: 'pointer'
  },
  labels: { fontSize: 25, fontWeight: 600, color: "#000" },
  icons: { fontSize: 30, color: "#000" },
  buttonStyle: { minHeight: { sm: "64px", xs: "48px" } },
  logoutIcon: { fontSize: { sm: 50, xs: 36 }, color: "#000" },
  outletContainer: {
    flexGrow: 1,
    p: 3,
    maxWidth: 1300
  },
};
function Dashboard() {
  const sidebarIcon = [
    { icon: <DashboardIcon sx={styles.icons} /> },
    { icon: <AccountBoxIcon sx={styles.icons} /> },
    { icon: <AccountBoxIcon sx={styles.icons} /> },
  ];
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState("");
  const handleActive = (id) => {
    setIsActive(id);
  };
  useEffect(() => {
    if (isActive === "") {
      setIsActive("Dashboard");
    } else if (isActive === "Dashboard") {
      navigate("/admin/dashboard");
    } else if (isActive === "Users") {
      navigate("/admin/users-info");
    } else if (isActive === "Shops") {
      navigate("/admin/shop-info");
    }
  }, [isActive, navigate]);

  const loggedOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/admin/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Box sx={styles.root}>
      <Helmet>
        <title>Dashboard</title>
        <link rel="Aquapond Icon" href={logo} />
      </Helmet>
      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          background: "#FF9967",
        }}
      >
        <Toolbar variant='regular'>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant='h6' noWrap component='div' sx={styles.labels}>
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer sx={styles.drawerContainer} variant='permanent' anchor='left'>
        <Button sx={styles.buttonStyle} onClick={loggedOut}>
          <PowerSettingsNewIcon sx={styles.logoutIcon} />
          <Typography sx={styles.labels}>Log Out</Typography>
        </Button>
        <Divider />
        <List sx={{ background: "#FF9967", paddingLeft: 3 }}>
          {["Dashboard", "Shops"].map((text, index) => (
            <ListItem
              key={text}
              sx={
                isActive === text
                  ? styles.menuItemContainerActive
                  : styles.menuItemContainer
              }
              onClick={() => handleActive(text)}
            >
              <ListItemIcon>{sidebarIcon[index].icon}</ListItemIcon>
              <ListItemText
                primary={<Typography sx={styles.labels}>{text}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box container justifyContent="center" component={Grid}>
        <Box sx={styles.outletContainer}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

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
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    padding: 3,
    flexGrow: 1,
    maxWidth: 1300
  },
  outletContainerMD: {
    padding: 3,
    flexGrow: 1,
    maxWidth: 900
  },
};
function Dashboard() {
  const matchesMD = useMediaQuery('(min-width:982px)');
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
  const [state, setState] = React.useState(false)
  const toggleDrawer = () => {
    setState({ ...state, state: false });
  };
  useEffect(() => {
    if (isActive === "") {
      setIsActive("Dashboard");
      setState(false)
    } else if (isActive === "Dashboard") {
      navigate("/admin/dashboard");
      setState(false)
    } else if (isActive === "Users") {
      navigate("/admin/users-info");
      setState(false)
    } else if (isActive === "Shops") {
      navigate("/admin/shop-info");
      setState(false)
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
          width: '100%',
          background: "#FF9967",
        }}
      >
        <Toolbar variant='regular'>
          <Button onClick={() => setState(true)}><MenuIcon sx={styles.logoutIcon} /><Typography sx={styles.labels}>OPEN</Typography></Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={styles.buttonStyle} onClick={loggedOut}>
            <PowerSettingsNewIcon sx={styles.logoutIcon} />
            <Typography sx={styles.labels}>Log Out</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer sx={styles.drawerContainer} anchor='left' open={state} onClose={toggleDrawer}>
        <Button onClick={() => setState(false)}><MenuOpenIcon sx={styles.logoutIcon} /><Typography sx={styles.labels}>CLOSE</Typography></Button>
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
        <Box sx={matchesMD ? styles.outletContainer : styles.outletContainerMD}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

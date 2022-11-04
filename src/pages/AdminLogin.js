import React from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Helmet } from "react-helmet";
import logo from '../assets/icon3.png'

const style = {
  section1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 1500,
  },
  root: {
    backgroundColor: "#FF9967",
    height: {
      xs: "110vh",
      sm: "100vh",
      md: "100vh",
    },
    width: "100%",
  },
  headerContainer: {
    width: "50%",
    height: 80,
    alignItems: "center",
  },
  arrowIconStyle: {
    fontSize: {
      xs: 30,
      sm: 40,
      md: 50,
    },
    color: "#fff",
  },
  formContainer: {
    flexDirection: "column",
    //justifyContent: 'center',
    width: {
      xs: 250,
      sm: 350,
      md: 400,
    },
    display: "flex",
    alignItems: "center",
    margin: {
      sm: "auto",
      md: "auto",
    },
    marginTop: {
      xs: 4,
    },
    padding: 3,
    borderRadius: 1,
    backgroundColor: "white",
  },
  formTitle: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: "600",
    marginBottom: 2,
  },
  textTitleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: {
      xs: 0,
      sm: 6,
      md: 12,
    },
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  textFieldStyle: {
    m: 1,
    width: {
      xs: "30ch",
      sm: "35ch",
      md: "35ch",
    },
  },
  iconTextField: {
    color: "black",
    fontSize: 30,
  },
  buttonStyle: {
    m: 1,
    width: {
      xs: "30ch",
      sm: "35ch",
      md: "35ch",
    },
    height: "6.5ch",
    marginTop: 4,
    fontWeight: 'bold'
  },
};

function AdminLogin({ loggedIn }) {
  let navigate = useNavigate();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    error: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async () => {
    if (values.username === "" || values.password === "") {
      setValues({ ...values, error: "It seems there are empty fields." });
    } else if (values.username === "admin" && values.password === "password") {
      try {
        await signInWithEmailAndPassword(auth, "admin@yopmail.com", "password")
          .then((userCredential) => {
            // Signed in
            navigate("/admin/dashboard");
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            setValues({ ...values, error: errorMessage });
          });
      } catch (error) { }
    } else {
      setValues({ ...values, error: "Invalid credentials." });
    }
  };
  return (
    <Box component={Grid} container justifyContent='center' sx={style.root}>
      <Helmet>
        <title>Admin login</title>
        <link rel="Aquapond Icon" href={logo} />
      </Helmet>
      <Box sx={style.section1}>
        <Box sx={style.formContainer}>
          <Typography sx={style.formTitle}>Admin Login</Typography>
          {values.error && <Alert severity='error'>{values.error}</Alert>}
          <Box sx={style.textTitleContainer}>
            <Typography sx={style.textTitle}>Username:</Typography>
          </Box>
          <TextField
            sx={style.textFieldStyle}
            id='input-with-icon-textfield'
            value={values.username}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            onChange={handleChange("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle sx={style.iconTextField} />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
          <Box sx={style.textTitleContainer}>
            <Typography sx={style.textTitle}>Password:</Typography>
          </Box>
          <FormControl sx={style.textFieldStyle} variant='outlined'>
            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              startAdornment={
                <InputAdornment position='start'>
                  <KeyIcon
                    sx={{
                      color: "black",
                      fontSize: 30,
                    }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? (
                      <VisibilityOff sx={style.iconTextField} />
                    ) : (
                      <Visibility sx={style.iconTextField} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant='contained'
            color='custom'
            sx={style.buttonStyle}
            onClick={login}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLogin;

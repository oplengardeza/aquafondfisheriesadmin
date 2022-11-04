import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#B79FE7",
      main: "#9370db",
      dark: "#7A6A9A",
      contrastText: "#000",
    },
    secondary: {
      light: "#FFBB99",
      main: "#FF9967",
      dark: "#AA6644",
      contrastText: "#fff",
    },
    custom: {
      light: "#8595C6",
      main: "#4860AA",
      dark: "#304071",
      contrastText: "#fff",
    },
    neutral: {
      main: "#ffffff",
      contrastText: "#000000",
    },
  },
});

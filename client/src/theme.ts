import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#F7F9F7", "400": "#F7F9F7" },
    error: { main: "#750D37" },
    secondary: { main: "#210124" },
    info: { main: "#DBF9F0" },
    success: { main: "#259c25" },
  },
  typography: {
    fontFamily: "montserrat",
    fontSize: 12,
  },
});

export default theme;

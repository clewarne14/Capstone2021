import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Typography, Grid, Avatar } from "@mui/material";
import Button from "../Button";
import ClickSelect from "../ClickSelect";
import "./styles.scss";

const settings = [
  { onClick: () => alert("hi"), text: "Profile" },
  { onClick: () => alert("hi"), text: "Account" },
  { onClick: () => alert("hi"), text: "Dashboard" },
  { onClick: () => alert("hi"), text: "Logout" },
];

const Navbar: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar className="navbar" color="secondary" position="static">
      <Grid container justifyContent="space-around">
        <Grid item md={8}>
          <Typography variant="h3">CodeCreate</Typography>
        </Grid>
        <Grid container columnSpacing={5} md={4}>
          <Grid item container columnSpacing={2} md={10}>
            <Grid item md={4}>
              <Button onClick={() => alert("hi")}>Lists</Button>
            </Grid>
            <Grid item md={4}>
              <Button onClick={() => alert("hi")}>Code</Button>
            </Grid>
            <Grid item md={4}>
              <Button className="navbar--button" onClick={() => alert("hi")}>
                Create
              </Button>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <ClickSelect options={settings} className="navbar--avatar">
              <Avatar
                variant="square"
                alt="Avatar"
                src="/static/images/avatar/2.jpg"
                title="Open settings"
              />
            </ClickSelect>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;

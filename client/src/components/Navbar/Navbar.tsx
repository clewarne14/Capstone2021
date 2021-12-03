import React, { FC } from "react";
import { SxProps } from "@mui/system";
import { AppBar, Typography, Grid, Avatar, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import colors from "../../colors";
import Button from "../Button";
import ClickSelect from "../ClickSelect";

const settings = [
  { onClick: () => alert("hi"), text: "Profile" },
  { onClick: () => alert("hi"), text: "Account" },
  { onClick: () => alert("hi"), text: "Dashboard" },
  { onClick: () => alert("hi"), text: "Logout" },
];

const buttonSx: SxProps<Theme> = {
  color: colors.black,
  fontSize: { xs: "1rem", md: "1rem", lg: "1.5rem" },
};

const Navbar: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar sx={{ padding: "1rem", height: "5rem" }} color="secondary">
      <Grid container justifyContent="space-evenly">
        <Grid item md={6}>
          <Typography variant="h3">CodeCreate</Typography>
        </Grid>
        <Grid container item md={6} columnSpacing={2}>
          <Grid item container columnSpacing={2} md={11}>
            <Grid item md={4}>
              <Button onClick={() => alert("hello")}>Lists</Button>
            </Grid>
            <Grid item md={4}>
              <Button onClick={() => alert("hello")}>Code</Button>
            </Grid>
            <Grid item md={4}>
              <Button onClick={() => alert("hello")}>Create</Button>
            </Grid>
          </Grid>
          <Grid item md={1}>
            <ClickSelect options={settings}>
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

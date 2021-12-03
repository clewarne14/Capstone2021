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
  fontSize: { xs: "1rem", md: "1rem", lg: "2rem", padding: 0 },
  maxWidth: "25rem",
};

const Navbar: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar sx={{ padding: "1rem", height: "5rem" }} color="secondary">
      <Grid container justifyContent="space-between">
        <Grid item xs={10} sm={6}>
          <Typography variant="h3">CodeCreate</Typography>
        </Grid>
        <Grid container item xs={2} sm={6} columnSpacing={2}>
          {!isSmallScreen && (
            <Grid item container columnSpacing={2} sm={10} lg={11}>
              <Grid item sm={4}>
                <Button sx={buttonSx} onClick={() => alert("hello")}>
                  Lists
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button sx={buttonSx} onClick={() => alert("hello")}>
                  Code
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button sx={buttonSx} onClick={() => alert("hello")}>
                  Create
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid item xs={10} sm={2} lg={1}>
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

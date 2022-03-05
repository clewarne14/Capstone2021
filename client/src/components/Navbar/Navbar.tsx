import React, { FC } from "react";
import { SxProps } from "@mui/system";
import { AppBar, Typography, Grid, Avatar, Theme } from "@mui/material";
import colors from "../../colors";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import Button from "../Button";
import ClickSelect from "../ClickSelect";
import { Link } from "react-router-dom";

const routes = [
  { text: "Lists", url: "/lists" },
  { text: "Code", url: "/code" },
  { text: "Create", url: "/create-problem/type" },
];

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
  const isSmallScreen = useSmallScreen();

  return (
    <AppBar sx={{ padding: "1rem", position: "relative" }} color="secondary">
      <Grid container justifyContent="space-between">
        <Grid item xs={10} sm={6}>
          <Typography variant="h3">CodeCreate</Typography>
        </Grid>
        <Grid container item xs={2} sm={6} columnSpacing={2}>
          {!isSmallScreen && (
            // Render the navbar buttons
            <Grid item container columnSpacing={2} sm={10} lg={11}>
              {routes.map((route) => (
                <Grid key={route.text} item sm={4}>
                  <Button sx={buttonSx}>
                    <Link style={{ textDecoration: "none" }} to={route.url}>
                      {route.text}
                    </Link>
                  </Button>
                </Grid>
              ))}
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

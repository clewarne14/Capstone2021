import React, { FC } from "react";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/system";
import { AppBar, Typography, Grid, Avatar, Theme } from "@mui/material";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import colors from "../../colors";
import { routes } from "../../Routes";
import Button from "../Button";
import ClickSelect from "../ClickSelect";
import { useAuth0 } from "@auth0/auth0-react";

const buttonSx: SxProps<Theme> = {
  color: colors.black,
  fontSize: { xs: "1rem", md: "1rem", lg: "1.5rem", padding: 0 },
  maxWidth: "25rem",
};

const Navbar: FC = () => {
  const isSmallScreen = useSmallScreen();
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const settings = [
    { onClick: () => alert("hi"), text: "Profile" },
    {
      onClick: () => logout({ returnTo: "http://localhost:3000" }),
      text: "Logout",
    },
  ];

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
                <Grid key={route.text} item sm={user ? 4 : 3}>
                  <Link style={{ textDecoration: "none" }} to={route.url}>
                    <Button sx={buttonSx}>{route.text}</Button>
                  </Link>
                </Grid>
              ))}
              {!isAuthenticated && (
                <Grid item sm={3}>
                  <Button onClick={loginWithRedirect} sx={buttonSx}>
                    Signin
                  </Button>
                </Grid>
              )}
            </Grid>
          )}
          {isAuthenticated && user && (
            <Grid item xs={10} sm={2} lg={1}>
              <ClickSelect options={settings}>
                <Avatar
                  variant="square"
                  alt="Avatar"
                  src={user.picture}
                  title="Open settings"
                />
              </ClickSelect>
            </Grid>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;

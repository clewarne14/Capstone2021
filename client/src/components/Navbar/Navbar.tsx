import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { SxProps } from "@mui/system";
import { AppBar, Typography, Grid, Avatar, Theme, Box } from "@mui/material";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import colors from "../../colors";
import { routes } from "../../Routes";
import Button from "../Button";
import ClickSelect from "../ClickSelect";

const buttonSx: SxProps<Theme> = {
  color: colors.black,
  fontSize: { xs: "1rem", md: "1rem", lg: "1.5rem", padding: 0 },
  maxWidth: "25rem",
};

const Navbar: FC = () => {
  const isSmallScreen = useSmallScreen();
  const navigate = useNavigate();
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();

  const settings = [
    {
      onClick: () => navigate(`/localhost:3000/profile/${user?.nickname}`),
      text: "Profile",
    },
    {
      onClick: () => logout({ returnTo: "http://localhost:3000" }),
      text: "Logout",
    },
  ];

  return (
    <Box sx={{ paddingBottom: "5rem" }}>
      <AppBar
        sx={{ padding: "1rem", position: "absolute", top: 0, height: "5rem" }}
        color="secondary"
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={10} sm={6}>
            <Typography variant="h3">CodeCreate</Typography>
          </Grid>
          < Grid container item xs={2} sm={6} columnSpacing={2}>
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
                    <Button onClick={loginWithPopup} sx={buttonSx}>
                      Signin
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
            {isAuthenticated && user && (
              <Grid item xs={10} sm={2} lg={1}>
                <ClickSelect options={settings}>
                  <Avatar variant="square" alt="Avatar" src={user.picture} />
                </ClickSelect>
              </Grid>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Navbar;

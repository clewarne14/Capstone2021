import React, { FC } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import Button from "../Button";
import "./styles.scss";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar className="navbar" color="secondary" position="static">
      <Grid container justifyContent="space-around">
        <Grid item sm={8}>
          <Typography variant="h2">CodeCreate</Typography>
        </Grid>
        <Grid container columnSpacing={5} sm={4}>
          <Grid item container columnSpacing={2} sm={10}>
            <Grid item sm={4}>
              <Button onClick={() => alert("hi")}>Lists</Button>
            </Grid>
            <Grid item sm={4}>
              <Button onClick={() => alert("hi")}>Code</Button>
            </Grid>
            <Grid item sm={4}>
              <Button onClick={() => alert("hi")}>Create</Button>
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Tooltip
              sx={{ width: "80%", height: "100%" }}
              title="Open settings"
              className="navbar--avatar"
              onClick={handleOpenUserMenu}
            >
              <Avatar
                variant="square"
                alt="Avatar"
                src="/static/images/avatar/2.jpg"
                title="Open settings"
              />
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;

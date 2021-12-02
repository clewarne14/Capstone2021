import React, { FC, useState } from "react";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";

type Props = {
  options: { text: string; onClick: () => void }[];
  className?: string;
  children: any;
};

const ClickSelect: FC<Props> = ({ children, options, className }: Props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    <>
      <Tooltip
        className={className}
        sx={{ width: "100%", height: "100%", cursor: "pointer" }}
        title="Open settings"
        onClick={handleOpenUserMenu}
      >
        {children}
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
        {options.map((setting) => (
          <MenuItem key={setting.text} onClick={setting.onClick}>
            <Typography textAlign="center">{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ClickSelect;

import React, { FC, useState } from "react";
import { Menu, MenuItem, Theme, Tooltip, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

type Props = {
  options: { text: string; onClick: () => void }[];
  children: any;
  sx?: SxProps<Theme>;
};

const ClickSelect: FC<Props> = ({ children, options, sx }: Props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Tooltip
        sx={{ width: "100%", height: "100%", cursor: "pointer", ...sx }}
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

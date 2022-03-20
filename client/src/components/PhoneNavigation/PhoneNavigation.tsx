import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import colors from "../../colors";
import { routes } from "../../Routes";

const PhoneNavigation: FC = () => {
  const [value, setValue] = useState(0);

  const navigationSx = {
    color: colors.white,
    "&:focus": { color: colors.blue },
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      sx={{ backgroundColor: colors.black, color: colors.blue }}
    >
      {routes.map((route) => (
        <BottomNavigationAction
          sx={navigationSx}
          label={route.text}
          icon={route.icon}
          component={RouterLink}
          to={route.url}
          key={route.text}
        />
      ))}
    </BottomNavigation>
  );
};

export default PhoneNavigation;

import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import colors from "../../colors";
import { routes } from "../../Routes";

const PhoneNavigation: FC = () => {
  const [value, setValue] = useState(0);
  const isSmallScreen = useSmallScreen();

  const navigationSx = {
    color: colors.white,
    "&:focus": { color: colors.blue },
  };

  return (
    <>
      {isSmallScreen && (
        <Box
          sx={{
            paddingTop: "3.5rem",
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            sx={{
              position: "fixed",
              width: "100%",
              bottom: 0,
              backgroundColor: colors.black,
              color: colors.blue,
            }}
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
        </Box>
      )}
    </>
  );
};

export default PhoneNavigation;

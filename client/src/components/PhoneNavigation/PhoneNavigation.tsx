import React, { FC, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import ListIcon from "@mui/icons-material/List";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import colors from "../../colors";

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
      <BottomNavigationAction
        sx={navigationSx}
        label="Lists"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        sx={navigationSx}
        label="Code"
        icon={<ComputerIcon />}
      />
      <BottomNavigationAction
        sx={navigationSx}
        label="Create"
        icon={<AddToPhotosIcon />}
      />
    </BottomNavigation>
  );
};

export default PhoneNavigation;

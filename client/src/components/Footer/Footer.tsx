import React, { FC } from "react";
import { Box } from "@mui/system";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import PhoneNavigation from "../PhoneNavigation";
import colors from "../../colors";

const Footer: FC = () => {
  const isSmallScreen = useSmallScreen();
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        backgroundColor: colors.black,
        position: "fixed",
        left: "0",
        bottom: "0",
        textAlign: "center",
      }}
    >
      {isSmallScreen && <PhoneNavigation />}
    </Box>
  );
};

export default Footer;

import React, { FC } from "react";
import { Box } from "@mui/system";
import PhoneNavigation from "../PhoneNavigation";
import colors from "../../colors";

const Footer: FC = () => {
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
      <PhoneNavigation />
    </Box>
  );
};

export default Footer;

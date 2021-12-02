import { Box } from "@mui/system";
import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        backgroundColor: "black",
        position: "fixed",
        left: "0",
        bottom: "0",
        textAlign: "center",
      }}
    ></Box>
  );
};

export default Footer;

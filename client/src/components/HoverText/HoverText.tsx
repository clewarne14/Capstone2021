import React, { FC, ReactNode } from "react";
import { Box } from "@mui/system";
import { Fade, Typography } from "@mui/material";

type Props = { text: string; open: boolean; children: ReactNode };

const HoverText: FC<Props> = ({ text, open, children }: Props) => {
  return (
    <Box
      sx={{ position: "relative", justifyContent: "center", display: "flex" }}
    >
      <Fade in={open}>
        <Typography
          sx={{
            position: "absolute",
            pointerEvents: "none",
            top: "-1.2rem",
            width: "100rem",
          }}
        >
          {text}
        </Typography>
      </Fade>
      {children}
    </Box>
  );
};

export default HoverText;

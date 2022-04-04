import React, { FC, ReactNode } from "react";
import { Box } from "@mui/system";
import colors from "../../colors";

type Props = { children: ReactNode };

const Tag: FC<Props> = ({ children }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "20%",
        backgroundColor: colors.blue,
        padding: "0.5rem",
        fontWeight: 700,
        width: "fit-content",
      }}
    >
      {children}
    </Box>
  );
};

export default Tag;

import React, { FC } from "react";
import { Button as MUIButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import colors from "../../colors";

type Props = {
  children: any;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

const Button: FC<Props> = ({ onClick, children, sx }: Props) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: colors.white,
        color: colors.black,
        width: "100%",
        height: "100%",
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};

export default Button;

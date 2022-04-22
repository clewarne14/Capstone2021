import React, { FC, ReactNode } from "react";
import { Button as MUIButton, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import colors from "../../colors";

export type ButtonProps = {
  children: any;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  endIcon?: ReactNode;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  sx,
  disabled,
  endIcon = <></>,
}: ButtonProps) => {
  return (
    <MUIButton
      endIcon={endIcon}
      variant="contained"
      disabled={disabled}
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

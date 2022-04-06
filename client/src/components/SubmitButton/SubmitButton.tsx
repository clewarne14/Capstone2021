import React, { FC } from "react";
import colors from "../../colors";
import Button, { ButtonProps } from "../Button/Button";

const SubmitButton: FC<ButtonProps> = ({
  children,
  endIcon,
  onClick,
  sx,
}: ButtonProps) => (
  <Button
    endIcon={endIcon}
    onClick={onClick}
    sx={{
      backgroundColor: colors.maroon,
      "&:hover": { backgroundColor: colors.darkMaroon },
      color: colors.white,
      ...sx,
    }}
  >
    {children}
  </Button>
);

export default SubmitButton;

import React, { FC } from "react";
import { Button as MUIButton, Typography } from "@mui/material";
import "./styles.scss";

type Props = {
  children: any;
  onClick: () => void;
  className?: string;
};

const Button: FC<Props> = ({ onClick, children, className }: Props) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      className={`button ${className}`}
      onClick={onClick}
    >
      <Typography variant="h4" fontWeight="500">
        {children}
      </Typography>
    </MUIButton>
  );
};

export default Button;

import React, { FC } from "react";
import { Button as MUIButton, Typography } from "@mui/material";
import "./styles.scss";

type Props = {
  children: any;
  onClick: () => void;
};

const Button: FC<Props> = ({ onClick, children }: Props) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      className="button"
      onClick={onClick}
    >
      <Typography variant="h4" fontWeight="500">
        {children}
      </Typography>
    </MUIButton>
  );
};

export default Button;

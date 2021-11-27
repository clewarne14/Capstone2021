import React, { FC } from "react";
import "./styles.scss";

type Props = {
  children: any;
  onClick: () => void;
};

const Button: FC<Props> = ({ onClick, children }: Props) => {
  return (
    <Button className="button" onClick={onClick}>
      {children}
    </Button>
  );
};

export default Button;

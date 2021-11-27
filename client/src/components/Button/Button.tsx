import React, { FC } from "react";
import "./styles.scss";

type Props = {
  children: any;
  onClick: () => void;
};

const Button: FC<Props> = ({ onClick, children }: Props) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

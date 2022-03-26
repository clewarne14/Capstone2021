import React, { FC } from "react";
import { InputLabel, MenuItem, Select as MUISelect } from "@mui/material";

type Props = {
  options: Array<any>;
  value: any;
  setValue: (val: any) => void;
  label: string;
};

const Select: FC<Props> = ({ options, setValue, value, label }: Props) => {
  return (
    <>
      <InputLabel sx={{ fontSize: "1.5rem" }}>{label}</InputLabel>
      <MUISelect
        fullWidth={true}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MUISelect>
    </>
  );
};
export default Select;

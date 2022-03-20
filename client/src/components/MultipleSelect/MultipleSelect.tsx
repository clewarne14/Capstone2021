import React, { FC } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

type Props = {
  label: string;
  options: Array<any>;
  onChange: (val: any) => void;
  values: Array<String>;
};

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect: FC<Props> = ({
  label,
  options,
  onChange,
  values,
}: Props) => {
  return (
    <>
      <InputLabel sx={{ fontSize: "1.5rem" }} id="demo-multiple-chip-label">
        {label}
      </InputLabel>
      <Select
        sx={{ width: "100%" }}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={values}
        onChange={(e) => {
          const {
            target: { value },
          } = e;
          onChange(typeof value === "string" ? value.split(",") : value);
        }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value, index) => (
              <Chip key={`${value}${index}`} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default MultipleSelect;

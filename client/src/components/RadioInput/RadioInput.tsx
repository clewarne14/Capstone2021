import React, { FC } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import colors from "../../colors";

type Props = {
  setValue: (e: any) => void;
  options: Array<string>;
  value: string;
  label: string;
};

const RadioInput: FC<Props> = ({ options, setValue, value, label }: Props) => {
  return (
    <>
      <InputLabel sx={{ fontSize: "1.5rem" }}>{label}</InputLabel>

      <FormControl>
        <RadioGroup
          row
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio color="secondary" />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default RadioInput;

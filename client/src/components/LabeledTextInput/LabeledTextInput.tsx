import React, { FC } from "react";
import { InputLabel, TextField, Theme } from "@mui/material";
import { SxProps } from "@mui/system";

type Props = {
  label: string;
  onChange: (e: string) => void;
  value: string;
  multiline?: boolean;
  sx?: SxProps<Theme>;
};

const LabeledTextInput: FC<Props> = ({
  label,
  onChange,
  value,
  sx,
  multiline = false,
}: Props) => {
  return (
    <>
      <InputLabel sx={{ fontSize: "1.5rem" }}>{label}</InputLabel>
      <TextField
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="text"
        sx={sx ?? { width: "100%" }}
        multiline={multiline}
      />
    </>
  );
};

export default LabeledTextInput;

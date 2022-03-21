import React, { FC, useRef } from "react";
import { Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "../Button";
import colors from "../../colors";

export type Choice = {
  text: string;
  active: boolean;
  id: number;
  disabled: boolean;
};

type Props = {
  label: string;
  choices: Array<Choice>;
  setChoices: (updatedChoices: Array<Choice>) => void;
  minChoices: number;
  maxChoices: number;
};

const ChoiceSelect: FC<Props> = ({
  choices,
  label,
  maxChoices,
  minChoices,
  setChoices,
}: Props) => {
  return (
    <Grid container>
      <InputLabel sx={{ fontSize: "1.5rem" }}>{label}</InputLabel>
      <Grid item justifyContent="center" container spacing={5}>
        {choices.map((choice) => (
          <Grid sm={6} item>
            <TextField
              onClick={() => {
                setChoices(
                  choices.map((oldChoice) => ({
                    active: oldChoice.id === choice.id,
                    text: oldChoice.text,
                    id: oldChoice.id,
                    disabled: true,
                  }))
                );
              }}
              onMouseEnter={(e) => {
                setChoices(
                  choices.map((oldChoice) => ({
                    active: oldChoice.active,
                    disabled: oldChoice.id !== choice.id,
                    id: oldChoice.id,
                    text: oldChoice.text,
                  }))
                );
                e.currentTarget.focus();
              }}
              sx={{ width: "100%", color: colors.black }}
              disabled={choice.disabled}
              value={choice.text}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {choice.active && (
                      <CheckCircleIcon
                        sx={{ color: colors.green, marginRight: "0.5rem" }}
                      />
                    )}
                    <HighlightOffIcon
                      sx={{ color: colors.maroon, cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        choices.length > minChoices &&
                          setChoices(
                            choices.filter(
                              (oldChoice) => oldChoice.id !== choice.id
                            )
                          );
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        ))}
      </Grid>

      {choices.length < maxChoices && (
        <Grid container justifyContent="center" item marginTop="2rem">
          <Grid item>
            <Button
              onClick={() => {
                if (choices.length < maxChoices) {
                  let randomId = Math.floor(Math.random() * 100000);
                  while (choices.find((choice) => choice.id === randomId)) {
                    randomId = Math.floor(Math.random() * 100000);
                  }

                  setChoices([
                    ...choices,
                    { id: randomId, text: "", active: false, disabled: true },
                  ]);
                }
              }}
              sx={{
                backgroundColor: colors.green,
              }}
            >
              Add more
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ChoiceSelect;

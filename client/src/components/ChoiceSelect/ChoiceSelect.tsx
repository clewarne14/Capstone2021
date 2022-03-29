import React, { FC, ReactNode } from "react";
import { Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAlert } from "../../contexts/AlertContext";
import Button from "../Button";
import colors from "../../colors";
import HelpButton from "../HelpButton";

// TODO: Add validation

export type Choice = {
  text: string;
  active: boolean;
  id: number;
};

type Props = {
  label: string;
  choices: Array<Choice>;
  helpButton?: { description: string; title: string };
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
  helpButton,
}: Props) => {
  const setAlert = useAlert();
  return (
    <Grid container>
      <InputLabel sx={{ fontSize: "1.5rem" }}>
        {label}
        {helpButton && (
          <HelpButton
            description={helpButton.description}
            title={helpButton.title}
          />
        )}
      </InputLabel>
      <Grid item justifyContent="center" container spacing={5}>
        {choices.map((choice) => (
          <Grid key={choice.id} sm={6} item>
            <TextField
              onChange={(e) => {
                const inputBeingEdited = choices.find(
                  (oldChoice) => choice.id === oldChoice.id
                );
                if (inputBeingEdited) inputBeingEdited.text = e.target.value;
                setChoices([...choices]);
              }}
              sx={{ width: "100%", color: colors.black }}
              value={choice.text}
              placeholder="Fill this question in"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* Correct answer icon */}
                    <CheckCircleIcon
                      onClick={() =>
                        setChoices(
                          choices.map((oldChoice) => ({
                            active: oldChoice.id === choice.id,
                            text: oldChoice.text,
                            id: oldChoice.id,
                          }))
                        )
                      }
                      sx={{
                        color: choice.active ? colors.green : colors.black,
                        marginRight: "0.5rem",
                        cursor: "pointer",
                      }}
                    />

                    {/* Delete icon */}
                    <HighlightOffIcon
                      sx={{ color: colors.maroon, cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (choices.length > minChoices)
                          setChoices(
                            choices.filter(
                              (oldChoice) => oldChoice.id !== choice.id
                            )
                          );
                        else
                          setAlert({
                            text: `The minimum number of choices required is at least ${minChoices}.`,
                            variant: "warning",
                          });
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
        <Grid container justifyContent="center" item marginTop="3rem">
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
                    { id: randomId, text: "", active: false },
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

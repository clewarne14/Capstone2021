import React, { FC, useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { useAlert } from "../../contexts/AlertContext";
import Button from "../../components/Button";
import ChoiceSelect, {
  Choice,
} from "../../components/ChoiceSelect/ChoiceSelect";
import colors from "../../colors";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";
import HelpButton from "../../components/HelpButton";

const MultipleChoiceCreation: FC = () => {
  const setAlert = useAlert();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [choices, setChoices] = useState<Array<Choice>>([
    {
      active: true,
      text: "",
      id: 1,
    },
    { active: false, text: "", id: 2 },
  ]);

  /**
   * Validates text fields (title, description, as well as the choices text inputs)
   * @returns false if any of the validations go wrong, true otherwise
   */
  const validate = () => {
    if (title.length === 0) {
      setAlert({ text: "Title must not be empty", variant: "warning" });
      return false;
    }

    if (description.length === 0) {
      setAlert({ text: "Description must not be empty", variant: "warning" });
      return false;
    }

    const choicesUsed = new Set();

    for (const choice of choices) {
      if (choice.text === "") {
        setAlert({
          text: "One or more choices are empty. Either get rid of the offending choice or include text in that choice box.",
          variant: "warning",
        });
        return false;
      }

      if (choicesUsed.has(choice.text)) {
        setAlert({
          text: `One or more choices with the text: "${choice.text}", please remove or change the offending choice(s)`,
          variant: "warning",
        });
        return false;
      } else choicesUsed.add(choice.text);
    }

    return true;
  };

  const validateAndSubmit = async () => {
    if (!validate()) return;
    const data = await fetch("http://localhost:4000/multiple-choice", {
      method: "POST",
      body: JSON.stringify({ title, description, choices, tags }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Grid
      container
      margin="auto"
      display="flex"
      justifyContent="center"
      width="60%"
      rowSpacing={5}
      marginBottom="2rem"
    >
      <ProblemCreationHeader
        problemCreationTitle="Multiple Choice"
        description={description}
        setDescription={setDescription}
        setTags={setTags}
        tags={tags}
        title={title}
        setTitle={setTitle}
      />
      <Grid item sm={12}>
        <ChoiceSelect
          setChoices={(updatedChoices: Array<Choice>) =>
            setChoices(updatedChoices)
          }
          label={"Choices"}
          choices={choices}
          minChoices={2}
          maxChoices={4}
          helpButton={{
            description:
              "A multiple choice problem can have 2-4 choices. One of these choices will be the correct answer, while the rest are incorrect. The correct answer is indicated by the green checkmark at the very end of a choice. Click on a gray checkmark to indicate this choice is the correct choice.",
            title: "Choices",
          }}
        />
      </Grid>

      <Grid container justifyContent="flex-end" item xs={12}>
        <Grid xs={2} item>
          <Button
            onClick={validateAndSubmit}
            sx={{ backgroundColor: colors.maroon, color: colors.white }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MultipleChoiceCreation;

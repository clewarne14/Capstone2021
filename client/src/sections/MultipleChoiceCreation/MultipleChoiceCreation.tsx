import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import Button from "../../components/Button";
import ChoiceSelect, {
  Choice,
} from "../../components/ChoiceSelect/ChoiceSelect";
import colors from "../../colors";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";

const MultipleChoiceCreation: FC = () => {
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

  const handleSubmit = async () => {
    const data = await fetch("http://localhost:4000/multiple-choice", {
      method: "POST",
      body: JSON.stringify({ title, description, choices, tags }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
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
        />
      </Grid>

      <Grid container justifyContent="flex-end" item xs={12}>
        <Grid xs={2} item>
          <Button
            onClick={handleSubmit}
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

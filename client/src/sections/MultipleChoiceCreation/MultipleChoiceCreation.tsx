import React, { FC, useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "../../components/Button";
import LabeledTextInput from "../../components/LabeledTextInput/LabeledTextInput";
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect";
import ChoiceSelect, {
  Choice,
} from "../../components/ChoiceSelect/ChoiceSelect";
import colors from "../../colors";

const MultipleChoiceCreation: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dbTags, setDbTags] = useState<Array<string>>([]);
  const [choices, setChoices] = useState<Array<Choice>>([
    { active: true, text: "Double click to edit!", id: 1, disabled: true },
    { active: false, text: "I'm an incorrect answer!", id: 2, disabled: true },
  ]);
  const [tags, setTags] = useState([]);

  const handleSubmit = async () => {
    const data = await fetch("http://localhost:4000/sendCode", {
      method: "POST",
      body: JSON.stringify({ title, description, choices }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
  };

  console.log(choices);
  // Use effect to grab tags from the database
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/tags");
      const data = await res.json();
      setDbTags(data.map((tag: { name: string }) => tag.name));
    })();
  }, []);

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
      <Grid item>
        <Typography textAlign="center" variant="h2">
          Multiple Choice
        </Typography>
      </Grid>

      <Grid item spacing={10} container display="flex">
        <Grid item sm={6}>
          <LabeledTextInput onChange={setTitle} label="Title" value={title} />
        </Grid>
        <Grid item sm={6}>
          <MultipleSelect
            onChange={(e) => setTags(e)}
            values={tags}
            label="Tags"
            options={dbTags}
          />
        </Grid>
      </Grid>

      <Grid item sm={12}>
        <LabeledTextInput
          label="Description"
          onChange={setDescription}
          value={description}
          multiline={true}
        />
      </Grid>

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
          <Button sx={{ backgroundColor: colors.maroon, color: colors.white }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MultipleChoiceCreation;

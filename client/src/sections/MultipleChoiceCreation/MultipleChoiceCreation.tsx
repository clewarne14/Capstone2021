import { TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import Button from "../../components/Button";

const MultipleChoiceCreation: FC = () => {
  return (
    <section>
      <Typography variant="h2">Multiple Choice</Typography>

      <Typography variant="h4">Title</Typography>
      <TextField type="text" />

      <Typography variant="h4">Description</Typography>
      <TextField type="text" multiline={true} />

      <Typography variant="h4">Choices</Typography>
      <TextField type="text" />

      <Button>Submit</Button>
    </section>
  );
};

export default MultipleChoiceCreation;

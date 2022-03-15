import { TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import Button from "../../components/Button";

const MultipleChoiceCreation: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState("");

  const handleSubmit = async () => {
    const data = await fetch("http://localhost:4000/sendCode", {
      method: "POST",
      body: JSON.stringify({ title, description, choices }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
  };

  console.log(title, description, choices);

  return (
    <section>
      <Typography variant="h2">Multiple Choice</Typography>

      <Typography variant="h4">Title</Typography>
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />

      <Typography variant="h4">Description</Typography>
      <TextField
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        multiline={true}
      />

      <Typography variant="h4">Choices</Typography>
      <TextField
        onChange={(e) => setChoices(e.target.value)}
        value={choices}
        type="text"
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </section>
  );
};

export default MultipleChoiceCreation;

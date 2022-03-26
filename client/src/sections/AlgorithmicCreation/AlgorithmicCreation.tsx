import React, { useState } from "react";
import { Grid } from "@mui/material";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";
import Select from "../../components/Select/Select";
import Editor from "../../components/Editor";

const languages = ["python", "javascript", "java", "c++"];

const AlgorithmicCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [language, setLanguage] = useState("python");

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
        problemCreationTitle="Algorithmic"
        description={description}
        setDescription={setDescription}
        setTags={setTags}
        tags={tags}
        title={title}
        setTitle={setTitle}
      />
      <Grid item container>
        <Grid sm={4} item>
          <Select options={languages} setValue={setLanguage} value={language} />
        </Grid>
      </Grid>

      <Grid item>
        <Editor scode="" />
      </Grid>
    </Grid>
  );
};

export default AlgorithmicCreation;

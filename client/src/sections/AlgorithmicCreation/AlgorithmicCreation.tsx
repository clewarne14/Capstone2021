import React, { useEffect, useState } from "react";
import { Grid, InputLabel } from "@mui/material";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";
import Select from "../../components/Select/Select";
import Editor from "../../components/Editor";
import Button from "../../components/Button";
import FileUploadButton from "../../components/FileUploadButton";

const languages = ["python", "javascript", "java", "c++"];

const AlgorithmicCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [language, setLanguage] = useState("python");
  const [startCode, setStartCode] = useState("");
  const [startCodeFile, setstartCodeFile] = useState<File>();

  console.log(startCodeFile);

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
          <Select
            label="language"
            options={languages}
            setValue={setLanguage}
            value={language}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item sm={12}>
          <InputLabel sx={{ fontSize: "1.5rem" }}>Starting Code</InputLabel>
        </Grid>
        <FileUploadButton
          file={startCodeFile}
          setFile={(value) => setstartCodeFile(value)}
          gridItem={true}
        />
        <Grid item sm={4}>
          <Button>New file</Button>
        </Grid>
        {!startCodeFile && (
          <Grid item sm={12}>
            <Editor
              code={startCode}
              setCode={(val) => setStartCode(val)}
              language={language}
            />
          </Grid>
        )}
      </Grid>

      <Grid item container>
        <Grid sm={12}>
          <InputLabel sx={{ fontSize: "1.5rem" }}>Test Code</InputLabel>
          <Editor
            code={startCode}
            setCode={(val) => setStartCode(val)}
            language={language}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlgorithmicCreation;

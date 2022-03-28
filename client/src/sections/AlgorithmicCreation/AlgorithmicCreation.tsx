import React, { useState } from "react";
import { Grid, InputLabel } from "@mui/material";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";
import Select from "../../components/Select/Select";
import Editor from "../../components/Editor";
import Button from "../../components/Button";
import FileUploadButton from "../../components/FileUploadButton";
import colors from "../../colors";
import { useAlert } from "../../contexts/AlertContext";
import NewFileOrUploadButton from "./components/NewFileOrUploadButton/NewFileOrUploadButton";

const languages = ["python", "javascript", "java", "c++"];

const AlgorithmicCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [language, setLanguage] = useState("python");
  const [startCode, setStartCode] = useState("");
  const [startCodeFile, setstartCodeFile] = useState<File>();
  const [testSuiteCode, setTestSuiteCode] = useState("");
  const [testSuiteCodeFile, setTestSuiteCodeFile] = useState<File>();
  const setAlert = useAlert();

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
            label="Language"
            options={languages}
            setValue={setLanguage}
            value={language}
          />
        </Grid>
      </Grid>

      <NewFileOrUploadButton
        header="Test code"
        language={language}
        newFile={testSuiteCode}
        setNewFile={setTestSuiteCode}
        uploadedFile={testSuiteCodeFile}
        setUploadedFile={setTestSuiteCodeFile}
      />

      <Grid container justifyContent="flex-end" item xs={12}>
        <Grid xs={2} item>
          <Button
            onClick={() => {
              console.log(setAlert);
              if (setAlert) {
                setAlert({ variant: "success", text: "Adding successful" });
                console.log("here");
              }
            }}
            sx={{ backgroundColor: colors.maroon, color: colors.white }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlgorithmicCreation;

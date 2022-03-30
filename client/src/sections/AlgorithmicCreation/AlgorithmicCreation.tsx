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
import TightWrapper from "../../components/TightWrapper";

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

    return true;
  };

  return (
    <TightWrapper>
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
    </TightWrapper>
  );
};

export default AlgorithmicCreation;

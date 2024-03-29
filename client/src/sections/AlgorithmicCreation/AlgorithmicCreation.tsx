import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid } from "@mui/material";
import ProblemCreationHeader from "../../components/ProblemCreationHeader/ProblemCreationHeader";
import Select from "../../components/Select/Select";
import { useAlert } from "../../contexts/AlertContext";
import NewFileOrUploadButton from "./components/NewFileOrUploadButton/NewFileOrUploadButton";
import TightWrapper from "../../components/TightWrapper";
import SubmitButton from "../../components/SubmitButton";
import { PostRequestResponse } from "../../Routes";

const languages = ["python", "javascript", "java", "c++"];

const AlgorithmicCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [language, setLanguage] = useState("python");
  const [startCode, setStartCode] = useState("");
  const [testSuiteCode, setTestSuiteCode] = useState("");
  const { isAuthenticated, user } = useAuth0();
  const setAlert = useAlert();
  const navigation = useNavigate();

  /**
   * Validates text fields (title, description, as well as the choices text inputs)
   * @returns false if any of the validations go wrong, true otherwise
   */
  const validate = () => {
    if (!isAuthenticated) {
      setAlert({ text: "Sign in to create this problem", variant: "error" });
      return false;
    }

    if (title.trim().length === 0) {
      setAlert({ text: "Title must not be empty", variant: "warning" });
      return false;
    }

    if (description.trim().length === 0) {
      setAlert({ text: "Description must not be empty", variant: "warning" });
      return false;
    }

    if (testSuiteCode.trim().length === 0) {
      setAlert({
        text: "Test suite code must not be empty",
        variant: "warning",
      });
      return false;
    }

    return true;
  };

  const validateAndSubmit = async () => {
    if (!validate()) return;

    const data = await fetch("http://localhost:4000/algorithmic", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        tags,
        email: user ? user.email : "",
        testSuite: testSuiteCode,
        language,
        startingCode: startCode,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response: PostRequestResponse = await data.json();
    if (response.success) {
      navigation("/code");
      setAlert({ text: response.message, variant: "success" });
    } else {
      setAlert({ text: response.message, variant: "error" });
    }
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
        header="Starting code"
        language={language}
        newFile={startCode}
        setNewFile={setStartCode}
        helpButton={{
          description:
            "Algorithmic problems (especially debugging problems) will sometimes come with code that the user starts with. Examples of starting code could be function headers without the actual implementation, or with the implementation if you are doing something like a debugging problem.",
          title: "Starting code",
        }}
      />

      <NewFileOrUploadButton
        header="Test code suite"
        language={language}
        newFile={testSuiteCode}
        setNewFile={setTestSuiteCode}
        helpButton={{
          description:
            "The test code suite contains the tests that will run against users code.",
          title: "Test code suite",
        }}
      />

      <Grid container justifyContent="flex-end" item xs={12}>
        <Grid xs={2} item>
          <SubmitButton onClick={validateAndSubmit}>Submit</SubmitButton>
        </Grid>
      </Grid>
    </TightWrapper>
  );
};

export default AlgorithmicCreation;

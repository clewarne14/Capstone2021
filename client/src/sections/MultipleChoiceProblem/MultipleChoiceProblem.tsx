import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Radio,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography,
  FormLabel,
} from "@mui/material";
import { MultipleChoiceProblemGetResponse } from "../../Routes";
import colors from "../../colors";
import { Box } from "@mui/system";

const MultipleChoiceProblem: FC = () => {
  const [problem, setProblem] = useState<MultipleChoiceProblemGetResponse>();
  const [choices, setChoices] = useState<{ text: string; used: boolean }[]>();
  const { problemId } = useParams<{ problemId: string }>();

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `http://localhost:4000/multiple-choice/${problemId}`
      );
      const response: MultipleChoiceProblemGetResponse = await data.json();
      setProblem(response);
      const formattedChoices = response.choices.map((choice) => ({
        text: choice,
        used: false,
      }));
      setChoices(formattedChoices);
    })();
  }, [problemId]);

  return problem && choices ? (
    <Grid
      padding={2}
      marginTop="2rem"
      container
      display="flex"
      flexDirection="column"
      textAlign="center"
    >
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {problem.title}
      </Typography>
      <Typography variant="h5">
        By <span>{problem.creatorName}</span>
      </Typography>
      <Typography variant="h5" marginTop="2rem">
        {problem.problemDescription}
      </Typography>
      <Grid container item marginTop="3rem">
        {choices.map((choice) => (
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            container
            sm={3}
            sx={{
              backgroundColor: colors.gray,
              borderRadius: "5%",
              height: "20rem",
              "&:hover": {
                transition: "0.3s",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ marginTop: "2rem" }} variant="h5">
              {choice.text}
            </Typography>
            <Box
              sx={{
                marginTop: "50%",
                borderRadius: "50%",
                backgroundColor: colors.darkgray,
                width: "2rem",
                height: "2rem",
              }}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : (
    <>Nothing</>
  );
};

export default MultipleChoiceProblem;

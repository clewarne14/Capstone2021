import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { MultipleChoiceProblemGetResponse } from "../../Routes";
import TightWrapper from "../../components/TightWrapper";
import ChoiceBox from "./components/ChoiceBox/ChoiceBox";
import SubmitButton from "../../components/SubmitButton";
import { useLoading } from "../../contexts/LoadingContext";
import { useAlert } from "../../contexts/AlertContext";
import Embedder from "../../components/Embedder";
import Likes from "../../components/Likes";

const MultipleChoiceProblem: FC = () => {
  const [problem, setProblem] = useState<MultipleChoiceProblemGetResponse>();
  const [choices, setChoices] = useState<{ text: string; used: boolean }[]>();
  const [selected, setSelected] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { problemId } = useParams<{ problemId: string }>();
  const setAlert = useAlert();
  const setLoading = useLoading();

  const handleSubmit = () => {
    if (!problem || !choices) {
      setAlert({
        text: "Something strange happened, refresh the page",
        variant: "error",
      });
      return;
    } else {
    }
    if (selected === "") {
      setAlert({
        text: "You must select one of the choices",
        variant: "warning",
      });
      return;
    }
    if (problem.answer !== selected) {
      setAlert({
        text: selected,
        variant: "error",
        variantOverride: "Incorrect answer:",
      });

      setChoices((oldChoices) =>
        oldChoices?.map((choice) =>
          choice.text === selected ? { text: choice.text, used: true } : choice
        )
      );
      setSelected("");
      return;
    }
    setAlert({
      text: `${selected} is the correct answer!`,
      variant: "success",
    });
    setShowConfetti(true);
  };

  useEffect(() => {
    (async () => {
      setLoading({ active: true, delay: 1000 });
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
  }, [problemId, setLoading]);

  return problem && choices ? (
    <>
      {showConfetti && <Confetti />}
      <TightWrapper spacing={8}>
        <Grid
          container
          item
          display="flex"
          flexDirection="column"
          textAlign="center"
        >
          <Grid
            container
            item
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid item sm={1}>
              <Embedder sx={{ fontSize: "2rem" }} />
            </Grid>
            <Grid item sx={{ width: "fit-content" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
                textAlign="center"
                variant="h3"
              >
                {problem.title}
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Likes numLikes={problem.likes} showThumbsDown={true} />
            </Grid>
          </Grid>
          <Typography variant="h5">By {problem.creatorName}</Typography>
        </Grid>
        <Grid textAlign="center" item>
          <Typography variant="h5">{problem.problemDescription}</Typography>
        </Grid>
        {/* CONTAINER */}
        <Grid item container spacing={2} height="35vh">
          {choices.map((choice) => (
            <ChoiceBox
              disabled={choice.used}
              setSelected={setSelected}
              size={12 / choices.length}
              text={choice.text}
              selected={selected === choice.text}
            />
          ))}
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item sm={2}>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </Grid>
        </Grid>
      </TightWrapper>
    </>
  ) : (
    <>Nothing</>
  );
};

export default MultipleChoiceProblem;

import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Confetti from "react-confetti";
import { MultipleChoiceProblemType } from "../../Routes";
import TightWrapper from "../../components/TightWrapper";
import ChoiceBox from "./components/ChoiceBox/ChoiceBox";
import SubmitButton from "../../components/SubmitButton";
import { useLoading } from "../../contexts/LoadingContext";
import { useAlert } from "../../contexts/AlertContext";
import ProblemHeader from "../../components/ProblemHeader";
import useWindowDimensions from "../../hooks/useWindowSize";
import { updateLikes } from "../../components/Likes/Likes";
import { useUser } from "../../contexts/AuthUserContext";
import isIFrame from "../../hooks/iseIFrame";

const MultipleChoiceProblem: FC = () => {
  const [problemSolved, setProblemSolved] = useState(false);
  const [problem, setProblem] = useState<MultipleChoiceProblemType>();
  const [choices, setChoices] = useState<{ text: string; used: boolean }[]>();
  const [selected, setSelected] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [displayLikes, setDisplayLikes] = useState(0);
  const user = useUser();
  const { problemId } = useParams<{ problemId: string }>();
  const setAlert = useAlert();
  const setLoading = useLoading();
  const { height, width } = useWindowDimensions();
  const isntIFrame = isIFrame();

  const likeProblem = async () => {
    if (problem) {
      const newLikes = await updateLikes(
        problem.problemType,
        problem?.problemId,
        user.username,
        1
      );
      setDisplayLikes(newLikes);
    }
  };

  const dislikeProblem = async () => {
    if (problem) {
      const newLikes = await updateLikes(
        problem.problemType,
        problem?.problemId,
        user.username,
        -1
      );
      setDisplayLikes(newLikes);
    }
  };

  const handleSubmit = async () => {
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

    if (problem.answer.trim() !== selected.trim()) {
      setAlert({
        text: selected,
        variant: "error",
        variantOverride: "Incorrect answer:",
      });

      setChoices((oldChoices) =>
        oldChoices?.map((choice) =>
          choice.text.trim() === selected.trim()
            ? { text: choice.text.trim(), used: true }
            : choice
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
    setProblemSolved(true);

    await fetch(`http://localhost:4000/user/${user.username}/problemsSolved`, {
      body: JSON.stringify({
        problemType: problem.problemType,
        problemId: problem.problemId,
      }),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });
  };

  useEffect(() => {
    (async () => {
      if (isntIFrame) setLoading({ active: true, delay: 1000 });
      const data = await fetch(
        `http://localhost:4000/multiple-choice/${problemId}`
      );
      const response: MultipleChoiceProblemType = await data.json();
      setProblem(response);
      const formattedChoices = response.choices.map((choice) => ({
        text: choice,
        used: false,
      }));
      setChoices(formattedChoices);
      setDisplayLikes(response.likes);
    })();
  }, [problemId, setLoading, setDisplayLikes]);

  return problem && choices ? (
    <>
      {showConfetti && <Confetti width={width - 25} height={height - 25} />}
      <TightWrapper spacing={8}>
        <ProblemHeader
          likeProblem={likeProblem}
          dislikeProblem={dislikeProblem}
          problemId={problem.problemId}
          problemType={problem.problemType}
          creatorName={problem.creatorName}
          likes={displayLikes}
          problemDescription={problem.problemDescription}
          problemTitle={problem.title}
        />
        {/* CONTAINER */}
        <Grid item container spacing={3} height="35vh">
          {choices.map((choice) => (
            <ChoiceBox
              key={choice.text}
              disabled={choice.used || problemSolved}
              setSelected={setSelected}
              size={12 / choices.length}
              text={choice.text}
              selected={selected === choice.text}
            />
          ))}
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item sm={2}>
            <SubmitButton disabled={problemSolved} onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </TightWrapper>
    </>
  ) : (
    <>This problem doesn't exist...</>
  );
};

export default MultipleChoiceProblem;

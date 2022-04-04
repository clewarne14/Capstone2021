import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ProblemCard from "../../components/ProblemCard";
import { MultipleChoiceProblemGetResponse } from "../../Routes";

const Lobby: FC = () => {
  const [problems, setProblems] = useState<
    Array<MultipleChoiceProblemGetResponse>
  >([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:4000/multiple-choice");
      const response: Array<MultipleChoiceProblemGetResponse> =
        await data.json();
      console.log(response);
      setProblems(response);
    })();
  }, []);
  return (
    <Grid container marginTop="2rem">
      <Grid spacing={4} padding={3} sm={8} item container>
        <Grid xs={12} item>
          <Typography textAlign="center" variant="h2">
            New problems
          </Typography>
        </Grid>
        <Grid item container>
          {problems.map((problem) => {
            const {
              creatorName,
              likes,
              problemType,
              tags,
              title,
              dateCreated,
              problemId,
            } = problem;
            return (
              <ProblemCard
                problemId={problemId}
                key={`${title}-${creatorName}-${dateCreated}`}
                likes={likes}
                problemType={problemType}
                tags={tags}
                title={title}
                username={creatorName}
                userPicture={
                  "https://media-exp1.licdn.com/dms/image/C4E03AQGFjkjQIYFTVQ/profile-displayphoto-shrink_400_400/0/1618550044653?e=2147483647&v=beta&t=6bOTWGxpoxHX7-tHErjufgWpZyzIMPhIQ7ERKpsp2eQ"
                }
              />
            );
          })}
        </Grid>
      </Grid>
      <Grid item container sm={4}></Grid>
    </Grid>
  );
};

export default Lobby;
import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ProblemCard from "../../components/ProblemCard";
import { MultipleChoiceProblemGetResponse } from "../../Routes";
import LobbyHeader from "./components/LobbyHeader/LobbyHeader";
import { useLoading } from "../../contexts/LoadingContext";

const Lobby: FC = () => {
  const [problems, setProblems] = useState<
    Array<MultipleChoiceProblemGetResponse>
  >([]);
  const setLoading = useLoading();

  useEffect(() => {
    (async () => {
      setLoading({ active: true, delay: 1000 });

      const data = await fetch("http://localhost:4000/multiple-choice");
      const response: Array<MultipleChoiceProblemGetResponse> =
        await data.json();

      setProblems(response);
    })();
  }, [setLoading]);

  return (
    <Grid container marginTop="2rem">
      <Grid spacing={2} padding={3} sm={8} item container>
        <Grid xs={12} marginBottom="2rem" item>
          <Typography textAlign="center" variant="h2">
            New problems
          </Typography>
        </Grid>
        <LobbyHeader />
        <Grid item container spacing={3}>
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
              <Grid key={`${title}-${creatorName}-${dateCreated}`} item sm={12}>
                <ProblemCard
                  problemId={problemId}
                  likes={likes}
                  problemType={problemType}
                  tags={tags}
                  title={title}
                  username={creatorName}
                  userPicture={
                    "https://media-exp1.licdn.com/dms/image/C4E03AQGFjkjQIYFTVQ/profile-displayphoto-shrink_400_400/0/1618550044653?e=2147483647&v=beta&t=6bOTWGxpoxHX7-tHErjufgWpZyzIMPhIQ7ERKpsp2eQ"
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item container sm={4}></Grid>
    </Grid>
  );
};

export default Lobby;

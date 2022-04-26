import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Grid, TextField, Typography } from "@mui/material";
import TightWrapper from "../../components/TightWrapper";
import { CompressedProblem, User } from "../../Routes";
import Likes from "../../components/Likes";
import CompressedProblemCard from "../../components/CompressedProblemCard";

type CreatedAndSolvedProblems = {
  problemsCreated: Array<CompressedProblem>;
  problemsSolved: Array<CompressedProblem>;
};

const UserProfile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const [viewedUser, setViewedUser] = useState<User>();
  const [recentlySolvedProblems, setRecentlySolvedProblems] = useState<
    Array<CompressedProblem>
  >([]);
  const [recentlyCreatedProblems, setRecentlyCreatedProblems] = useState<
    Array<CompressedProblem>
  >([]);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  console.log();

  useEffect(() => {
    (async () => {
      const user = await fetch(`http://localhost:4000/user/${username}`);
      const userResponse: User = await user.json();
      console.log(userResponse);
      setViewedUser(userResponse);

      const problems = await fetch(
        `http://localhost:4000/user/${username}/problems`
      );

      const problemsData: CreatedAndSolvedProblems = await problems.json();

      setRecentlySolvedProblems(
        problemsData.problemsSolved.filter((problem) => problem)
      );
      setRecentlyCreatedProblems(
        problemsData.problemsCreated.filter((problem) => problem)
      );
    })();
  }, [username]);

  return viewedUser ? (
    <TightWrapper spacing={6}>
      <Grid item container spacing={2}>
        <Grid
          display="flex"
          flexDirection="column"
          item
          container
          sm={4}
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {viewedUser.username}
            </Typography>
          </Grid>
          <Grid item>
            <img src={"/empty_avatar.png"} alt={viewedUser.username} />
          </Grid>
          <Grid item>
            <Likes numLikes={viewedUser.reputation} />
          </Grid>
        </Grid>
        <Grid
          item
          sm={8}
          container
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            fullWidth
            multiline
            value={viewedUser.bio ?? `Hi I'm ${viewedUser.username}`}
            minRows={9}
            inputProps={{ style: { fontSize: "1.5rem", textAlign: "center" } }}
          />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item container sm={6}>
          <Grid item container display="flex" justifyContent="center">
            <Typography marginBottom="1rem" variant="h3">
              Created
            </Typography>
          </Grid>
          <Grid item container display="flex" flexDirection="column">
            {recentlyCreatedProblems.map((problem) => (
              <Grid item key={problem.title}>
                <CompressedProblemCard
                  likes={problem.likes}
                  problemType={problem.problemType}
                  title={problem.title}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item container sm={6}>
          <Grid item container display="flex" justifyContent="center">
            <Typography marginBottom="1rem" variant="h3">
              Solved
            </Typography>
            <Grid item container display="flex" flexDirection="column">
              {recentlySolvedProblems.map((problem) => (
                <Grid item key={problem.title}>
                  <CompressedProblemCard
                    likes={problem.likes}
                    problemType={problem.problemType}
                    title={problem.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TightWrapper>
  ) : (
    <>No user found</>
  );
};

export default UserProfile;

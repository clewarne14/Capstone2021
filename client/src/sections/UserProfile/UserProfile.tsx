import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Grid, TextField, Typography } from "@mui/material";
import { useUser } from "../../contexts/AuthUserContext";
import TightWrapper from "../../components/TightWrapper";
import { CompressedProblem, User } from "../../Routes";
import Likes from "../../components/Likes";
import CompressedProblemCard from "../../components/CompressedProblemCard";
import CompressedProblemHolder from "../../components/CompressedProblemHolder";
import Button from "../../components/Button";
import colors from "../../colors";
import SubmitButton from "../../components/SubmitButton";

type CreatedAndSolvedProblems = {
  problemsCreated: Array<CompressedProblem>;
  problemsSolved: Array<CompressedProblem>;
};

const UserProfile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const [viewedUser, setViewedUser] = useState<User>();
  const [currentDescription, setCurrentDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [recentlySolvedProblems, setRecentlySolvedProblems] = useState<
    Array<CompressedProblem>
  >([]);
  const [recentlyCreatedProblems, setRecentlyCreatedProblems] = useState<
    Array<CompressedProblem>
  >([]);
  const currentUser = useUser();

  const getFooter = () => {
    if (username === currentUser.username && viewedUser) {
      if (!editing)
        return (
          <Grid container item display="flex" justifyContent="flex-end">
            <Grid item sm={2}>
              <Button
                onClick={() => setEditing(true)}
                sx={{
                  backgroundColor: colors.green,
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: colors.darkGreen,
                  },
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        );
      else
        return (
          <Grid
            container
            item
            spacing={2}
            display="flex"
            justifyContent="flex-end"
          >
            <Grid item>
              <Button
                onClick={() => {
                  setEditing(false);
                  setCurrentDescription(viewedUser.bio ?? `Hi I'm ${username}`);
                }}
                sx={{
                  backgroundColor: colors.charcoal,
                  color: colors.white,
                  "&:hover": {
                    backgroundColor: colors.darkCharcoal,
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <SubmitButton
                onClick={async () => {
                  fetch(`http://localhost:4000/user/${username}/profile`, {
                    method: "PATCH",
                    body: JSON.stringify({
                      bio: currentDescription,
                      profilePicture:
                        imageUrl === "" ? viewedUser.profilePicture : imageUrl,
                    }),
                    headers: { "Content-Type": "application/json" },
                  });
                }}
              >
                Apply changes
              </SubmitButton>
            </Grid>
          </Grid>
        );
    }
    return <div></div>;
  };

  useEffect(() => {
    (async () => {
      const user = await fetch(`http://localhost:4000/user/${username}`);
      const userResponse: User = await user.json();
      setViewedUser(userResponse);

      setCurrentDescription(
        userResponse.bio ?? `Hi I'm ${userResponse.username}`
      );

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

  let footer = getFooter();

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
          <Grid item width="85%">
            <img
              width="100%"
              height="300rem"
              src={
                viewedUser.profilePicture === "" || !viewedUser.profilePicture
                  ? "/empty_avatar.png"
                  : viewedUser.profilePicture
              }
              alt={viewedUser.username}
            />
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
          flexDirection="column"
          spacing={2}
        >
          <Grid item width="100%">
            <TextField
              fullWidth
              multiline
              disabled={!editing}
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              sx={{
                "&:disabled": {
                  color: colors.black,
                },
              }}
              minRows={editing ? 6 : 9}
              inputProps={{
                style: { fontSize: "1.5rem", textAlign: "center" },
              }}
              placeholder="Enter bio"
            />
          </Grid>
          {editing && (
            <Grid item width="100%">
              <TextField
                fullWidth
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image url to change profile picture"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <CompressedProblemHolder
          title="Created"
          problems={recentlyCreatedProblems}
        />
        <CompressedProblemHolder
          title="Solved"
          problems={recentlySolvedProblems}
        />
      </Grid>
      {footer}
    </TightWrapper>
  ) : (
    <>No user found</>
  );
};

export default UserProfile;

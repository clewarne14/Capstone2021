import React, { FC } from "react";
import { Grid, Typography, Card } from "@mui/material";
import { ProblemCardProps } from "../ProblemCard/ProblemCard";
import colors from "../../colors";
import Likes from "../Likes";
import Tag from "../Tag";
import SubmitButton from "../SubmitButton";
import { useNavigate } from "react-router-dom";

const SmallProblemCard: FC<ProblemCardProps> = ({
  likes,
  problemId,
  problemType,
  tags,
  title,
  userPicture,
  username,
}: ProblemCardProps) => {
  const navigation = useNavigate();

  return (
    <Card sx={{ backgroundColor: colors.gray, width: "100%" }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        padding={2}
        spacing={4}
      >
        <Grid
          item
          container
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Grid item>
            <Typography fontWeight={700} variant="h5">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: colors.maroon }} variant="h6">
              {problemType}
            </Typography>
          </Grid>
          <Grid item width="15%">
            <Likes numLikes={likes} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          xs={12}
        >
          <Grid
            container
            item
            display="flex"
            flexDirection="column"
            xs={5}
            alignItems="center"
          >
            {tags.map((tag) => (
              <Grid item key={tag}>
                <Tag>{tag}</Tag>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            container
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            xs={4}
          >
            <img width="70%" src={userPicture} alt={username} />
            <Typography>{username}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} display="flex" justifyContent="center">
          <Grid item xs={3}>
            <SubmitButton
              onClick={() => navigation(`${problemType}/${problemId}`)}
            >
              Solve
            </SubmitButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SmallProblemCard;

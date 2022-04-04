import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "../Button";
import colors from "../../colors";
import Tag from "../Tag";
import { useNavigate } from "react-router-dom";

type ProblemType = "multiple choice" | "algorithmic";

type Props = {
  title: string;
  problemType: ProblemType;
  username: string;
  userPicture: string;
  tags: Array<string>;
  likes: number;
  problemId: number;
};

const ProblemCard: FC<Props> = ({
  likes,
  problemType,
  tags,
  title,
  userPicture,
  username,
  problemId,
}: Props) => {
  const navigation = useNavigate();
  return (
    <Grid padding={2} container sx={{ backgroundColor: colors.gray }}>
      <Grid sm={2} display="flex" flexDirection="column" container item>
        <Typography variant="h4">{title}</Typography>
        <Typography sx={{ color: colors.maroon }} variant="h6">
          {problemType}
        </Typography>
      </Grid>
      <Grid
        display="flex"
        flexDirection="column"
        sm={2}
        container
        item
        textAlign="center"
      >
        <Grid item>
          <img width="50%" src={userPicture} alt={username} />
        </Grid>
        <Typography>{username}</Typography>
      </Grid>
      <Grid
        sm={3}
        spacing={1}
        display="flex"
        flexDirection="column"
        container
        item
        alignItems="center"
      >
        {tags.map((tag) => (
          <Grid item key={tag}>
            <Tag>{tag}</Tag>
          </Grid>
        ))}
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sm={2}
        container
        item
      >
        <Grid item>
          {likes} <ThumbUpIcon />
        </Grid>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sm={2}
        container
        item
      >
        <Button
          onClick={() => {
            if (problemType === "multiple choice") {
              navigation(`multiple-choice/${problemId}`);
            } else {
            }
          }}
          sx={{
            backgroundColor: colors.maroon,
            color: colors.white,
            height: "3rem",
          }}
        >
          Solve
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProblemCard;

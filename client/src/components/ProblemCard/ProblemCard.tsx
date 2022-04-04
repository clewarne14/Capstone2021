import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Card } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "../Button";
import colors from "../../colors";
import Tag from "../Tag";

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
    <Card sx={{ backgroundColor: colors.gray, width: "100%" }}>
      <Grid padding={2} container>
        <Grid sm={12 / 5} display="flex" flexDirection="column" container item>
          <Typography sx={{ fontWeight: 700 }} variant="h5">
            {title}
          </Typography>
          <Typography sx={{ color: colors.maroon }} variant="h6">
            {problemType}
          </Typography>
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          sm={12 / 5}
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
          sm={12 / 5}
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
          alignItems="center"
          justifyContent="center"
          sm={12 / 5}
          spacing={2}
          container
          item
        >
          <Grid item>
            <Typography sx={{ fontWeight: 700 }}>{likes}</Typography>
          </Grid>
          <Grid item>
            <ThumbUpIcon />
          </Grid>
        </Grid>
        <Grid display="flex" alignItems="center" sm={12 / 5} container item>
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
    </Card>
  );
};

export default ProblemCard;

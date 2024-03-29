import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Card } from "@mui/material";
import colors from "../../colors";
import { ProblemType } from "../../Routes";
import Tag from "../Tag";
import SubmitButton from "../SubmitButton";
import Likes from "../Likes";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export type ProblemCardProps = {
  title: string;
  problemType: ProblemType;
  username: string;
  userPicture: string;
  tags: Array<string>;
  likes: number;
  problemId: string;
};

const ProblemCard: FC<ProblemCardProps> = ({
  likes,
  problemType,
  tags,
  title,
  userPicture,
  username,
  problemId,
}: ProblemCardProps) => {
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
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigation(`/profile/${username}`);
          }}
        >
          <Grid item width="50%">
            <ProfilePicture alt={username} src={userPicture} />
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
          <Grid item sm={4}>
            <Likes numLikes={likes} />
          </Grid>
        </Grid>
        <Grid display="flex" alignItems="center" sm={12 / 5} container item>
          <SubmitButton
            onClick={() => navigation(`${problemType}/${problemId}`)}
            sx={{
              backgroundColor: colors.maroon,
              color: colors.white,
              height: "3rem",
            }}
          >
            Solve
          </SubmitButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProblemCard;

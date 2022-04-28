import { Card, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import colors from "../../colors";
import { ProblemType } from "../../Routes";
import Likes from "../Likes";

type Props = {
  title: string;
  problemType: ProblemType;
  likes: number;
};

const CompressedProblemCard: FC<Props> = ({
  likes,
  problemType,
  title,
}: Props) => {
  return (
    <Card sx={{ backgroundColor: colors.gray }}>
      <Grid container item padding={2}>
        <Grid
          container
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
          sm={6}
        >
          <Grid item>
            <Typography sx={{ fontWeight: 700 }} variant="h6">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: colors.maroon }} variant="h6">
              {problemType}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Likes numLikes={likes} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CompressedProblemCard;

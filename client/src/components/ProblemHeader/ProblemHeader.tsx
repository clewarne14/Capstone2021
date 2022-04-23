import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import Embedder from "../Embedder";
import Likes from "../Likes";

type Props = {
  likes: number;
  problemTitle: string;
  creatorName: string;
  problemDescription: string;
  showDescription?: boolean;
};

const ProblemHeader: FC<Props> = ({
  creatorName,
  likes,
  problemDescription,
  problemTitle,
  showDescription = true,
}: Props) => {
  return (
    <>
      <Grid
        container
        item
        display="flex"
        flexDirection="column"
        textAlign="center"
      >
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item sm={1}>
            <Embedder sx={{ fontSize: "2rem" }} />
          </Grid>
          <Grid item sx={{ width: "fit-content" }}>
            <Typography
              sx={{
                fontWeight: 700,
              }}
              textAlign="center"
              variant="h3"
            >
              {problemTitle}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Likes updateable={true} numLikes={likes} showThumbsDown={true} />
          </Grid>
        </Grid>
        <Typography variant="h5">By {creatorName}</Typography>
      </Grid>
      {showDescription && (
        <Grid textAlign="center" item>
          <Typography variant="h5">{problemDescription}</Typography>
        </Grid>
      )}
    </>
  );
};

export default ProblemHeader;

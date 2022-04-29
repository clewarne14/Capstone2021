import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Embedder from "../Embedder";
import Likes from "../Likes";
import AddToListButtonAndPopup from "../AddToListButtonAndPopup";
import { ProblemType } from "../../Routes";

type Props = {
  likes: number;
  problemTitle: string;
  creatorName: string;
  problemDescription: string;
  showDescription?: boolean;
  problemId: string;
  problemType: ProblemType;
};

const ProblemHeader: FC<Props> = ({
  creatorName,
  likes,
  problemDescription,
  problemTitle,
  showDescription = true,
  problemId,
  problemType,
}: Props) => {
  const navigation = useNavigate();
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
          <Grid
            item
            container
            sm={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item sm={6}>
              <Embedder sx={{ fontSize: "2rem" }} />
            </Grid>
            <Grid item sm={6}>
              <AddToListButtonAndPopup
                sx={{ fontSize: "2rem" }}
                problemId={problemId}
                problemType={problemType}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ width: "fit-content" }} sm={10}>
            <Typography
              sx={{
                fontWeight: 700,
              }}
              textAlign="center"
              variant="h4"
            >
              {problemTitle}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Likes updateable={true} numLikes={likes} showThumbsDown={true} />
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          sx={{ cursor: "pointer" }}
          onClick={() => navigation(`/profile/${creatorName}`)}
        >
          By {creatorName}
        </Typography>
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

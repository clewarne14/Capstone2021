import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Typography } from "@mui/material";
import colors from "../../colors";
import { ProblemType } from "../../Routes";
import Likes from "../Likes";

type Props = {
  title: string;
  problemType: ProblemType;
  problemId: string;
  likes: number;
};

const CompressedProblemCard: FC<Props> = ({
  likes,
  problemType,
  title,
  problemId,
}: Props) => {
  const [active, setActive] = useState(false);
  const navigation = useNavigate();

  const openActive = () => setActive(true);
  const closeActive = () => setActive(false);

  return (
    <Card
      sx={{
        backgroundColor: colors.gray,
        cursor: "pointer",
        width: "100%",
        height: "100%",
      }}
      onClick={() => navigation(`/code/${problemType}/${problemId}`)}
      onMouseEnter={openActive}
      onMouseLeave={closeActive}
      raised={active}
    >
      <Grid container item padding={2}>
        <Grid
          container
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
          sm={8}
        >
          <Grid item>
            <Typography sx={{ fontWeight: 700 }} variant="h6">
              {title.length > 20 ? title.substring(0, 20) + "..." : title}
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
          sm={4}
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

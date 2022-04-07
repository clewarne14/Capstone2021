import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";

const LobbyHeader: FC = () => {
  return (
    <Grid container item>
      <Grid item sm={12 / 5}>
        <Typography sx={{ fontWeight: 700 }} variant="h5">
          Title
        </Typography>
      </Grid>
      <Grid item sm={12 / 5}>
        <Typography textAlign="center" sx={{ fontWeight: 700 }} variant="h5">
          Author
        </Typography>
      </Grid>
      <Grid item sm={12 / 5}>
        <Typography textAlign="center" sx={{ fontWeight: 700 }} variant="h5">
          Tags
        </Typography>
      </Grid>
      <Grid item sm={12 / 5}>
        <Typography textAlign="center" sx={{ fontWeight: 700 }} variant="h5">
          Likes
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LobbyHeader;

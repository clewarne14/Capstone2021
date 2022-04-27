import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { CompressedProblem } from "../../Routes";
import CompressedProblemCard from "../CompressedProblemCard";

type Props = { problems: Array<CompressedProblem>; title: string };

const CompressedProblemHolder: FC<Props> = ({ problems, title }: Props) => {
  return (
    <Grid item container sm={6}>
      <Grid item container display="flex" justifyContent="center">
        <Typography marginBottom="1rem" variant="h3">
          {title}
        </Typography>
        <Grid item container display="flex" flexDirection="column">
          {problems.length !== 0 ? (
            problems.map((problem) => (
              <Grid item key={problem.title}>
                <CompressedProblemCard
                  likes={problem.likes}
                  problemType={problem.problemType}
                  title={problem.title}
                />
              </Grid>
            ))
          ) : (
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4">No recent activity :(</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompressedProblemHolder;

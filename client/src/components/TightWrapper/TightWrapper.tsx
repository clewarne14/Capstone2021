import React, { FC, ReactNode } from "react";
import { Grid } from "@mui/material";

/**
 * This component is used is the /section directory for some components. Shortens the screen size to 60% of the total width of the screen
 */

type Props = { children: ReactNode };

const TightWrapper: FC<Props> = ({ children }: Props) => {
  return (
    <Grid
      container
      margin="auto"
      display="flex"
      justifyContent="center"
      width="60%"
      rowSpacing={5}
      marginBottom="2rem"
    >
      {children}
    </Grid>
  );
};

export default TightWrapper;

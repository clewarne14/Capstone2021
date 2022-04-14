import React, { FC, ReactNode } from "react";
import { Grid } from "@mui/material";

/**
 * This component is used is the /section directory for some components. Shortens the screen size to 60% of the total width of the screen
 */

type Props = { children: ReactNode; spacing?: number };

const TightWrapper: FC<Props> = ({ children, spacing = 5 }: Props) => {
  return (
    <Grid
      container
      margin="auto"
      display="flex"
      justifyContent="center"
      item
      sm={7.2}
      xs={10}
      rowSpacing={spacing}
      marginBottom="2rem"
      flexDirection="column"
    >
      {children}
    </Grid>
  );
};

export default TightWrapper;

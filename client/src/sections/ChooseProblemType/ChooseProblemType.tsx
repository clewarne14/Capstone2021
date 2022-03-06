import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import IconButton from "../../components/IconButton";

const options = [
  { text: "Debugging", icon: "build", url: "create-problem/debugging" },
  {
    text: "Algorithmic",
    icon: "computer",
    url: "create-problem/algorithmic",
  },
  {
    text: "Multiple Choice",
    icon: "view_list",
    url: "create-problem/multiple-choice",
  },
];

const ChooseProblemType: FC = () => {
  const isSmallScreen = useSmallScreen();
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography sx={{ textAlign: "center", margin: "3.5rem" }} variant="h3">
        Choose problem type
      </Typography>
      <Grid container spacing={isSmallScreen ? 3 : 6} width="100%">
        {options.map((option) => (
          <Grid item xs={12} sm={4}>
            <IconButton key={option.text} {...option} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ChooseProblemType;

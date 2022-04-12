import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import IconButton from "../../components/IconButton";
import { useSmallScreen } from "../../contexts/SmallScreenContext";

const options = [
  {
    text: "Algorithmic",
    icon: "computer",
    url: "/create-problem/algorithmic",
  },
  {
    text: "Multiple Choice",
    icon: "view_list",
    url: "/create-problem/multiple-choice",
  },
];

const ChooseProblemType: FC = () => {
  const isSmallScreen = useSmallScreen();
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        sx={{
          textAlign: "center",
          margin: "3.5rem",
          width: "100%",
        }}
        variant={isSmallScreen ? "h5" : "h3"}
      >
        Choose problem type
      </Typography>
      <Grid container spacing={isSmallScreen ? 3 : 6} width="100%">
        {options.map((option) => (
          <Grid key={option.text} item xs={12} sm={12 / options.length}>
            <IconButton {...option} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ChooseProblemType;

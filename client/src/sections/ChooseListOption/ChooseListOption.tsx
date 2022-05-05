import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import IconButton from "../../components/IconButton";
import { useSmallScreen } from "../../contexts/SmallScreenContext";

const options = [
  {
    text: "All lists",
    icon: "list",
    url: "/lists/public",
  },
  {
    text: "My lists",
    icon: "account_box",
    url: "/lists/mylist",
  },
];

const ChooseListOption: FC = () => {
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
        Choose lists to view
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

export default ChooseListOption;

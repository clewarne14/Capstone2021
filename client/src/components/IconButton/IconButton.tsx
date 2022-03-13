import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Icon, Typography } from "@mui/material";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import colors from "../../colors";

type Props = { url: string; icon: string; text: string };

const IconButton: FC<Props> = ({ icon, text, url }: Props) => {
  const [raised, setRaised] = useState(false);
  const isSmallScreen = useSmallScreen();
  return (
    <Link style={{ textDecoration: "none", color: colors.black }} to={url}>
      <Card
        onMouseEnter={() => setRaised(true)}
        onMouseLeave={() => setRaised(false)}
        raised={raised}
        sx={{ backgroundColor: "#ECECEC", cursor: "pointer" }}
      >
        <CardContent>
          <Grid
            container
            rowSpacing={10}
            textAlign="center"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={isSmallScreen ? "row" : "column"}
          >
            <Grid item>
              <Typography variant={isSmallScreen ? "h5" : "h4"}>
                {text}
              </Typography>
            </Grid>
            <Grid item>
              <Icon sx={{ fontSize: isSmallScreen ? "5rem" : "12rem" }}>
                {icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default IconButton;

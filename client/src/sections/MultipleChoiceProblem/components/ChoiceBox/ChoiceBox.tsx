import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import colors from "../../../../colors";

type Props = {
  text: string;
  size: number;
  disabled: boolean;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
};

const ChoiceBox: FC<Props> = ({
  text,
  size,
  disabled,
  selected,
  setSelected,
}: Props) => {
  const [raised, setRaised] = useState(false);
  return (
    <Grid key={text} item sm={size} height="100%">
      <Card
        onMouseOver={() => setRaised(true)}
        onMouseOut={() => setRaised(false)}
        onClick={() => setSelected(text)}
        raised={raised}
        sx={{
          cursor: "pointer",
          backgroundColor: colors.gray,
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "0.4rem",
          pointerEvents: disabled ? "none" : "auto",
          border: selected ? `3px solid ${colors.green}` : "",
          opacity: disabled ? "50%" : "100%",
        }}
      >
        <Typography textAlign="center" variant="h5">
          {text}
        </Typography>
        <CheckCircleIcon
          sx={{ color: selected ? colors.green : colors.black }}
        />
      </Card>
    </Grid>
  );
};

export default ChoiceBox;

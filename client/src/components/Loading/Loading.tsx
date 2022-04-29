import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import colors from "../../colors";

type Props = { isLoading: boolean };

const Loading: FC<Props> = ({ isLoading }: Props) => {
  return isLoading ? (
    <Box
      sx={{
        position: "fixed",
        zIndex: 10000,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: colors.green, marginBottom: "1rem" }}
      >
        Loading
      </Typography>
      <CircularProgress size={40} color="info" />
    </Box>
  ) : (
    <></>
  );
};

export default Loading;

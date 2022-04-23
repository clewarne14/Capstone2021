import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import colors from "../../colors";

type Props = {
  numLikes: number;
  showThumbsDown?: boolean;
  updateable?: boolean;
};

const Likes: FC<Props> = ({
  numLikes,
  showThumbsDown = false,
  updateable = false,
}: Props) => (
  <Box justifyContent="space-around" display="flex" alignItems="center">
    <ThumbUpIcon
      sx={{
        cursor: updateable ? "pointer" : "none",
        transition: "0.3s",
        "&:hover": {
          color: updateable ? colors.green : "none",
        },
      }}
    />
    <Typography sx={{ fontWeight: 700 }}>{numLikes}</Typography>
    {showThumbsDown && (
      <ThumbDownIcon
        sx={{
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            color: colors.maroon,
          },
        }}
      />
    )}
  </Box>
);

export default Likes;

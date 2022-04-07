import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

type Props = { numLikes: number; showThumbsDown?: boolean };

const Likes: FC<Props> = ({ numLikes, showThumbsDown = false }: Props) => (
  <Box justifyContent="space-around" display="flex" alignItems="center">
    <ThumbUpIcon />
    <Typography sx={{ fontWeight: 700 }}>{numLikes}</Typography>
    {showThumbsDown && <ThumbDownIcon />}
  </Box>
);

export default Likes;

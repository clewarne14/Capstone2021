import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import colors from "../../colors";
import { ProblemType } from "../../Routes";

type Props = {
  numLikes: number;
  showThumbsDown?: boolean;
  updateable?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
};

export const updateLikes = async (
  problemType: ProblemType,
  problemId: string,
  username: string,
  likeValue: -1 | 1
) => {
  const response = await fetch(
    `http://localhost:4000/problems/${problemId}/likes`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemType, likeValue, username }),
    }
  );

  return await response.json();
};

const Likes: FC<Props> = ({
  numLikes,
  showThumbsDown = false,
  updateable = false,
  onDislike,
  onLike,
}: Props) => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <ThumbUpIcon
        onClick={onLike}
        sx={{
          cursor: updateable ? "pointer" : "none",
          transition: "0.3s",
          "&:hover": {
            color: updateable ? colors.green : "none",
          },
        }}
      />
      <Typography
        sx={{ fontWeight: 700, margin: "0 1rem", whiteSpace: "nowrap" }}
      >
        {numLikes}
      </Typography>
      {showThumbsDown && (
        <ThumbDownIcon
          onClick={onDislike}
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
};

export default Likes;

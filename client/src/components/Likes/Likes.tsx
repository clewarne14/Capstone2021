import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import colors from "../../colors";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  numLikes: number;
  showThumbsDown?: boolean;
  updateable?: boolean;
};

const Likes: FC<Props> = ({
  numLikes,
  showThumbsDown = false,
  updateable = false,
}: Props) => {
  const { isAuthenticated, user } = useAuth0();

  return (
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
};

export default Likes;

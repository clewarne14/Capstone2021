import React, { FC, useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import { Box, SxProps } from "@mui/system";
import { Theme, Typography } from "@mui/material";
import colors from "../../colors";
import { useAlert } from "../../contexts/AlertContext";

type Props = { hoverText?: string; sx?: SxProps<Theme> };

const Embedder: FC<Props> = ({
  hoverText = "Embed this problem into your website",
  sx,
}: Props) => {
  const [textActive, setTextActive] = useState(false);
  const setAlert = useAlert();
  return (
    <Box sx={{ position: "relative" }}>
      {textActive && (
        <Typography
          sx={{
            width: "150%",
            position: "absolute",
            pointerEvents: "none",
            top: "-3rem",
            right: "-5rem",
          }}
        >
          {hoverText}
        </Typography>
      )}
      <CodeIcon
        sx={{ color: colors.yellow, cursor: "pointer", ...sx }}
        onMouseOver={() => setTextActive(true)}
        onMouseLeave={() => setTextActive(false)}
        onClick={() => {
          setAlert({
            text: "Copied to clipboard",
            variant: "info",
            variantOverride: "",
          });
          navigator.clipboard.writeText(
            `<iframe src='${window.location.href}' title="codecreate" />`
          );
        }}
      />
    </Box>
  );
};

export default Embedder;

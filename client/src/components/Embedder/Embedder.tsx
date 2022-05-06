import React, { FC, useState } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { useAlert } from "../../contexts/AlertContext";
import HoverText from "../HoverText";
import colors from "../../colors";

type Props = { hoverText?: string; sx?: SxProps<Theme> };

const Embedder: FC<Props> = ({ hoverText = "Embed", sx }: Props) => {
  const [textActive, setTextActive] = useState(false);
  const setAlert = useAlert();
  return (
    <HoverText open={textActive} text={hoverText}>
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
            `<iframe width="65%" height="650rem" scrolling="no" frameBorder="0" src='${window.location.href}' title="codecreate" />`
          );
        }}
      />
    </HoverText>
  );
};

export default Embedder;

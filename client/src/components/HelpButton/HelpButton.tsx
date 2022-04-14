import React, { FC, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import { SxProps } from "@mui/system";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
} from "@mui/material";
import colors from "../../colors";

type Props = {
  title: string;
  description: string;
  sx?: SxProps<Theme>;
};

const HelpButton: FC<Props> = ({ description, title, sx }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <IconButton sx={{ color: colors.black, ...sx }} onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: "1.2rem" }}
            id="alert-dialog-description"
          >
            {description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HelpButton;

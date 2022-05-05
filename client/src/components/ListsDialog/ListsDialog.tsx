import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SxProps } from "@mui/system";
import { Grid, Theme } from "@mui/material";
import SubmitButton from "../SubmitButton";
import { AddToListProps } from "../AddToListButtonAndPopup/AddToListButtonAndPopup";

type Props = {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
  sx: SxProps<Theme>;
  lists: Array<AddToListProps>;
};

const ListsDialog: FC<Props> = ({ open, setOpen, setClose, sx }: Props) => {
  return (
    <Grid sx={sx}>
      <Dialog open={open} onClose={setClose}>
        <DialogTitle>Add Problem to List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select one or more of the lists down below to add this problem to!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SubmitButton sx={{ width: "40%" }}>Create new list</SubmitButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ListsDialog;

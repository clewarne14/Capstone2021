import React, { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SxProps } from "@mui/system";
import { Grid, Theme } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
  sx: SxProps<Theme>;
};

const ListsDialog: FC<Props> = ({ open, setOpen, setClose, sx }: Props) => {
  return (
    <Grid sx={sx}>
      <Button variant="outlined" onClick={setOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={setClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose}>Cancel</Button>
          <Button onClick={setClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ListsDialog;

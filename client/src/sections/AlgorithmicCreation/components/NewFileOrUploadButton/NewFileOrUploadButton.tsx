import React, { FC, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  InputLabel,
  Dialog,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FileUploadButton from "../../../../components/FileUploadButton";
import Button from "../../../../components/Button";
import Editor from "../../../../components/Editor";
import colors from "../../../../colors";

type Props = {
  header: string;
  uploadedFile: File | undefined;
  setUploadedFile: (file: File | undefined) => void;
  newFile: string;
  setNewFile: (val: string) => void;
  language: string;
};

const NewFileOrUploadButton: FC<Props> = ({
  header,
  newFile,
  setNewFile,
  setUploadedFile,
  uploadedFile,
  language,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => setDialogOpen(false);
  const handleOpen = () => setDialogOpen(true);

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: "1.1rem" }}
            id="alert-dialog-description"
          >
            If a new file is desired, the uploaded file will be lost. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: colors.maroon, fontWeight: 700 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ color: colors.green, fontWeight: 700 }}
            onClick={() => {
              setUploadedFile(undefined);
              handleClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item container spacing={2}>
        <Grid item sm={12}>
          <InputLabel sx={{ fontSize: "1.5rem" }}>{header}</InputLabel>
        </Grid>
        <FileUploadButton
          endIcon={uploadedFile ? <CheckIcon color="success" /> : <></>}
          file={uploadedFile}
          setFile={(file) => setUploadedFile(file)}
          gridItem={true}
        />
        <Grid item sm={4}>
          <Button
            onClick={uploadedFile && handleOpen}
            endIcon={uploadedFile ? <></> : <CheckIcon color="success" />}
          >
            New file
          </Button>
        </Grid>
        {/* Make sure this isn't an uploaded file already */}
        {!uploadedFile && (
          <Grid item sm={12}>
            <Editor
              code={newFile}
              setCode={(val) => setNewFile(val)}
              language={language}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NewFileOrUploadButton;

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
import HelpButton from "../../../../components/HelpButton";

type Props = {
  header: string;
  newFile: string;
  setNewFile: (val: string) => void;
  language: string;
  helpButton?: { description: string; title: string };
};

const NewFileOrUploadButton: FC<Props> = ({
  header,
  newFile,
  setNewFile,
  language,
  helpButton,
}: Props) => {
  return (
    <>
      <Grid item container spacing={2}>
        <Grid item sm={12}>
          <InputLabel sx={{ fontSize: "1.5rem" }}>
            {header}
            {helpButton && (
              <HelpButton
                title={helpButton.title}
                description={helpButton.description}
              />
            )}
          </InputLabel>
        </Grid>

        <Grid item xs={12} height="30vh">
          <Editor
            height="30vh"
            code={newFile}
            setCode={(val) => setNewFile(val)}
            language={language}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NewFileOrUploadButton;

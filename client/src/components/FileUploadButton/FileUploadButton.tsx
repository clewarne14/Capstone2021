import React, { FC } from "react";
import { Grid, InputLabel } from "@mui/material";
import Button from "../Button";

type Props = {
  file: File | undefined;
  setFile: (e: File | undefined) => void;
  gridItem?: boolean;
};

const getFileName = async (file: File) => await file.text();

const FileUploadButton: FC<Props> = ({
  file,
  setFile,
  gridItem = false,
}: Props) => {
  return (
    <Grid spacing={2} alignItems="center" container item={gridItem}>
      <Grid item sm={4}>
        <Button sx={{ position: "relative" }}>
          Upload file
          <input
            type="file"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              opacity: 0,
              cursor: "pointer",
            }}
            onChange={(e) => {
              if (e.target.files) setFile(e.target.files[0]);
            }}
            placeholder="Upload file"
          />
        </Button>
      </Grid>
      <Grid item sm={6}>
        <InputLabel>{file ? file.name : ""}</InputLabel>
      </Grid>
    </Grid>
  );
};

export default FileUploadButton;

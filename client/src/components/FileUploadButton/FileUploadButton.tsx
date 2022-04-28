import React, { FC, ReactNode } from "react";
import { Grid, InputLabel } from "@mui/material";
import Button from "../Button";

type Props = {
  file: File | undefined;
  setFile: (e: File | undefined) => void;
  gridItem?: boolean;
  endIcon?: ReactNode;
};

const FileUploadButton: FC<Props> = ({
  file,
  setFile,
  gridItem = false,
  endIcon = <></>,
}: Props) => {
  return (
    <Grid spacing={2} alignItems="center" container item={gridItem}>
      <Grid item xs={8} sm={4}>
        <Button endIcon={endIcon} sx={{ position: "relative" }}>
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
      <Grid item xs={4} sm={6}>
        <InputLabel>{file ? file.name : ""}</InputLabel>
      </Grid>
    </Grid>
  );
};

export default FileUploadButton;

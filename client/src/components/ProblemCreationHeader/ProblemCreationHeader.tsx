import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import LabeledTextInput from "../LabeledTextInput";
import MultipleSelect from "../MultipleSelect";
import TagSelect from "../TagSelect";

type Props = {
  problemCreationTitle: string;
  title: string;
  setTitle: (val: string) => void;
  tags: Array<string>;
  setTags: (val: Array<string>) => void;
  description: string;
  setDescription: (val: string) => void;
};

const ProblemCreationHeader: FC<Props> = ({
  problemCreationTitle,
  description,
  setDescription,
  setTags,
  setTitle,
  tags,
  title,
}: Props) => {
  return (
    <>
      <Grid item>
        <Typography textAlign="center" variant="h2">
          {problemCreationTitle}
        </Typography>
      </Grid>
      <Grid item spacing={{ xs: 5, sm: 10 }} container display="flex">
        <Grid item xs={12} sm={6}>
          <LabeledTextInput
            placeholder="Required"
            onChange={setTitle}
            label="Title"
            value={title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagSelect tags={tags} setTags={setTags} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LabeledTextInput
          placeholder="Required"
          label="Description"
          onChange={setDescription}
          value={description}
          multiline={true}
        />
      </Grid>
    </>
  );
};

export default ProblemCreationHeader;

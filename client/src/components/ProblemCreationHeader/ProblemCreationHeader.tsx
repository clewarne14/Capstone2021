import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import LabeledTextInput from "../LabeledTextInput";
import MultipleSelect from "../MultipleSelect";

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
  const [dbTags, setDbTags] = useState<Array<string>>([]);

  // Use effect to grab tags from the database
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/tags");
      const data = await res.json();
      setDbTags(data.map((tag: { name: string }) => tag.name));
    })();
  }, []);

  return (
    <>
      <Grid item>
        <Typography textAlign="center" variant="h2">
          {problemCreationTitle}
        </Typography>
      </Grid>
      <Grid item spacing={10} container display="flex">
        <Grid item sm={6}>
          <LabeledTextInput
            placeholder="Required"
            onChange={setTitle}
            label="Title"
            value={title}
          />
        </Grid>
        <Grid item sm={6}>
          <MultipleSelect
            onChange={(e) => setTags(e)}
            values={tags}
            label="Tags"
            options={dbTags}
          />
        </Grid>
      </Grid>
      <Grid item sm={12}>
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

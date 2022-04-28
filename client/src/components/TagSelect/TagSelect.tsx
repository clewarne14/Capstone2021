import React, { FC, useEffect, useState } from "react";
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import MultipleSelect from "../MultipleSelect";

type Props = {
  setTags: (e: any) => void;
  tags: Array<string>;
  sx?: SxProps<Theme>;
};

const TagSelect: FC<Props> = ({ setTags, tags, sx }: Props) => {
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
    <MultipleSelect
      maxOptions={3}
      onChange={(e) => setTags(e)}
      values={tags}
      label="Tags"
      options={dbTags}
      sx={sx}
    />
  );
};

export default TagSelect;

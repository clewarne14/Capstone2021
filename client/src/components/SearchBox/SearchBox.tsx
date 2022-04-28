import { Card, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import colors from "../../colors";
import LabeledTextInput from "../LabeledTextInput";
import RadioInput from "../RadioInput";
import SubmitButton from "../SubmitButton";
import TagSelect from "../TagSelect";

export type SortBy = "Newest" | "Oldest" | "Most popular" | "Least popular";

type Props = {
  subjectName: string;
  tags: Array<string>;
  createdBy: string;
  createdByOnChange: (e: string) => void;
  problemType: string;
  searchValue: string;
  searchValueOnChange: (e: string) => void;
  setTags: (e: any) => void;
  sortByValue: string;
  sortByValueOnChange: (e: any) => void;
  problemTypeOnChange: (e: any) => void;
  onSubmit: () => void;
};

const SearchBox: FC<Props> = ({
  createdBy,
  problemType,
  subjectName,
  tags,
  setTags,
  searchValue,
  searchValueOnChange,
  createdByOnChange,
  problemTypeOnChange,
  sortByValue,
  sortByValueOnChange,
  onSubmit,
}: Props) => {
  return (
    <Card
      sx={{
        backgroundColor: colors.gray,
        height: "min-content",
        width: "100%",
      }}
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        padding={2}
        spacing={4}
      >
        <Grid item>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center" }}
          >
            Search for a {subjectName}
          </Typography>
        </Grid>
        <Grid item>
          <LabeledTextInput
            sx={{ backgroundColor: colors.white, width: "100%" }}
            label="Name"
            onChange={searchValueOnChange}
            value={searchValue}
            placeholder={`Enter name of the ${subjectName}`}
          />
        </Grid>
        <Grid item>
          <TagSelect
            sx={{ backgroundColor: colors.white }}
            tags={tags}
            setTags={setTags}
          />
        </Grid>

        <Grid item>
          <LabeledTextInput
            label="Created by"
            placeholder={`Enter the name of creator whose ${subjectName}s you'd like to see`}
            onChange={createdByOnChange}
            value={createdBy}
            sx={{ backgroundColor: colors.white, width: "100%" }}
          />
        </Grid>

        <Grid item>
          <RadioInput
            label="Sort by"
            options={["Newest", "Oldest", "Most popular", "Least popular"]}
            setValue={sortByValueOnChange}
            value={sortByValue}
          />
        </Grid>

        <Grid item>
          <RadioInput
            label="Problem type"
            options={["All", "Algorithmic", "Multiple Choice"]}
            setValue={problemTypeOnChange}
            value={problemType}
          />
        </Grid>

        <Grid container item display="flex" justifyContent="flex-end">
          <Grid xs={4} item>
            <SubmitButton onClick={onSubmit}>Search</SubmitButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchBox;

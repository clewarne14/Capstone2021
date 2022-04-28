import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import SearchBox from "../../components/SearchBox";
import { SortBy } from "../../components/SearchBox/SearchBox";

const ListsPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [createdBy, setCreatedBy] = useState("");
  const [sortByValue, setSortByValue] = useState<SortBy>("Newest");
  const [searchProblemType, setSearchProblemType] = useState<string>("All");
  return (
    <Grid container marginTop="2rem">
      <Grid item container sm={8}></Grid>
      <Grid item container sm={4}>
        <SearchBox
          createdBy={createdBy}
          subjectName="list"
          createdByOnChange={(e) => setCreatedBy(e)}
          problemType={searchProblemType}
          searchValue={searchValue}
          setTags={(e) => setTags(e)}
          tags={tags}
          problemTypeOnChange={(e) => setSearchProblemType(e)}
          searchValueOnChange={(e) => setSearchValue(e)}
          sortByValue={sortByValue}
          sortByValueOnChange={(e) => setSortByValue(e)}
        />
      </Grid>
    </Grid>
  );
};

export default ListsPage;

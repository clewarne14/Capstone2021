import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useLoading } from "../../contexts/LoadingContext";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import ProblemCard from "../../components/ProblemCard";
import SmallProblemCard from "../../components/SmallProblemCard";
import LobbyHeader from "./components/LobbyHeader/LobbyHeader";
import SearchBox from "../../components/SearchBox";
import { SortBy } from "../../components/SearchBox/SearchBox";
import { User, Problem } from "../../Routes";

const searchProblems = async (
  searchValue: string,
  tags: Array<string>,
  createdBy: string,
  sortByValue: string,
  searchProblemType: string
) => {
  const response = await fetch("http://localhost:4000/problems", {
    body: JSON.stringify({
      searchValue,
      tags,
      createdBy,
      sortByValue,
      searchProblemType,
    }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data: Array<Problem> = await response.json();

  const problemsWithProfilePictures = data.map(async (problem) => {
    const user = await fetch(
      `http://localhost:4000/user/${problem.creatorName}`
    );
    const userData: User = await user.json();
    return {
      ...problem,
      profilePicture:
        userData.profilePicture === "" || !userData.profilePicture
          ? "/empty_avatar.png"
          : userData.profilePicture,
    };
  });

  return problemsWithProfilePictures;
};

const Lobby: FC = () => {
  const [problems, setProblems] = useState<Array<Problem>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [createdBy, setCreatedBy] = useState("");
  const [sortByValue, setSortByValue] = useState<SortBy>("Newest");
  const [searchProblemType, setSearchProblemType] = useState<string>("All");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const isSmallScreen = useSmallScreen();
  const setLoading = useLoading();

  useEffect(() => {
    console.log(searchButtonClicked);
    (async () => {
      setLoading({ active: true, delay: 1000 });

      const retrievedProblems = await searchProblems(
        searchValue,
        tags,
        createdBy,
        sortByValue,
        searchProblemType
      );

      setProblems(await Promise.all(retrievedProblems));
    })();
  }, [searchButtonClicked]);

  return (
    <Grid container marginTop="2rem" padding="1rem">
      <Grid spacing={2} padding={3} sm={8} item container>
        {!isSmallScreen && problems.length !== 0 && <LobbyHeader />}
        {problems.length === 0 && (
          <Grid item container display="flex" justifyContent="center">
            <Typography variant="h3">No problems found</Typography>
          </Grid>
        )}
        <Grid item container spacing={3}>
          {problems.map((problem) => {
            const {
              creatorName,
              likes,
              problemType,
              tags,
              title,
              dateCreated,
              problemId,
              profilePicture,
            } = problem;

            return (
              <Grid key={`${title}-${creatorName}-${dateCreated}`} item sm={12}>
                {isSmallScreen ? (
                  <SmallProblemCard
                    problemId={problemId}
                    likes={likes}
                    problemType={problemType}
                    tags={tags}
                    title={title}
                    username={creatorName}
                    userPicture={profilePicture}
                  />
                ) : (
                  <ProblemCard
                    problemId={problemId}
                    likes={likes}
                    problemType={problemType}
                    tags={tags}
                    title={title}
                    username={creatorName}
                    userPicture={profilePicture}
                  />
                )}
              </Grid>
            );
          })}
          )
        </Grid>
      </Grid>
      <Grid item container sm={4}>
        <SearchBox
          onSubmit={() => setSearchButtonClicked((oldVal) => !oldVal)}
          createdBy={createdBy}
          subjectName="problem"
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

export default Lobby;

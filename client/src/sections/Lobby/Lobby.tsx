import React, { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ProblemCard from "../../components/ProblemCard";
import SmallProblemCard from "../../components/SmallProblemCard";
import { User, Problem } from "../../Routes";
import LobbyHeader from "./components/LobbyHeader/LobbyHeader";
import { useLoading } from "../../contexts/LoadingContext";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import SearchBox from "../../components/SearchBox";
import { SortBy } from "../../components/SearchBox/SearchBox";

const Lobby: FC = () => {
  const [problems, setProblems] = useState<Array<Problem>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [createdBy, setCreatedBy] = useState("");
  const [sortByValue, setSortByValue] = useState<SortBy>("Newest");
  const [searchProblemType, setSearchProblemType] = useState<string>("All");
  const isSmallScreen = useSmallScreen();
  const setLoading = useLoading();

  console.log(searchValue, tags, createdBy, sortByValue, searchProblemType);

  useEffect(() => {
    (async () => {
      // setLoading({ active: true, delay: 1000 });

      const allProblems = await fetch("http://localhost:4000/problems");
      const allProblemsData: Array<Problem> = await allProblems.json();

      const formattedProblems = allProblemsData.map(async (problem, index) => {
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

      setProblems(await Promise.all(formattedProblems));
    })();
  }, [setLoading]);

  return (
    <Grid container marginTop="2rem">
      <Grid spacing={2} padding={3} sm={8} item container>
        <Grid xs={12} marginBottom="2rem" item>
          <Typography textAlign="center" variant={isSmallScreen ? "h4" : "h2"}>
            New problems
          </Typography>
        </Grid>
        {!isSmallScreen && <LobbyHeader />}
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
        </Grid>
      </Grid>
      <Grid item container sm={4}>
        <SearchBox
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

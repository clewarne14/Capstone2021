import React, { FC, useEffect, useState } from "react";
import { Grid, Card, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { AlgorithmicProblemType } from "../../Routes";
import ProblemHeader from "../../components/ProblemHeader";
import Editor from "../../components/Editor";
import colors from "../../colors";
import Button from "../../components/Button";

const AlgorithmicProblem: FC = () => {
  const [problem, setProblem] = useState<AlgorithmicProblemType>();
  const [userCode, setUserCode] = useState("");
  const { problemId } = useParams<{ problemId: string }>();
  const setLoading = useLoading();

  useEffect(() => {
    (async () => {
      // setLoading({ active: true, delay: 1000 });
      const data = await fetch(
        `http://localhost:4000/algorithmic/${problemId}`
      );

      const response: AlgorithmicProblemType = await data.json();
      console.log(response);
      setProblem(response);
    })();
  }, [problemId, setLoading]);

  return problem ? (
    <Grid
      container
      display="flex"
      justifyContent="center"
      spacing={5}
      marginTop="2rem"
    >
      <Grid container item width="60%">
        <ProblemHeader
          showDescription={false}
          creatorName={problem.creatorName}
          likes={problem.likes}
          problemDescription={problem.problemDescription}
          problemTitle={problem.title}
        />
      </Grid>

      <Grid container item display="flex" width="100%" spacing={3}>
        <Grid item sm={8}>
          <Editor
            height="60vh"
            language={problem.language}
            code={userCode}
            setCode={setUserCode}
          />
        </Grid>
        <Grid item sm={4}>
          <Card
            sx={{
              backgroundColor: colors.gray,
              height: "60vh",
            }}
          >
            <Grid
              display="flex"
              flexDirection="column"
              container
              textAlign="center"
              width="100%"
            >
              <Typography variant="h6">{problem.problemDescription}</Typography>
              <Grid
                alignSelf="flex-end"
                container
                item
                spacing={3}
                padding="1rem"
              >
                <Grid sm={4} item>
                  <Button>Tests</Button>
                </Grid>
                <Grid sm={4} item>
                  <Button>Run Code</Button>
                </Grid>
                <Grid sm={4} item>
                  <Button>Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <>This problem doesn't exist...</>
  );
};

export default AlgorithmicProblem;

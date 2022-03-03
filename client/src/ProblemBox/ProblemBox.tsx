import { Box } from "@mui/material";
import react, { FC } from "react";
import Editor from "../components/Editor";
import Question from "../sections/Questions/Question";

type Props = { startcode: string; problemtext: string };

const ProblemBox: FC<Props> = ({ problemtext, startcode }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "20rem",
        marginTop: "10rem",
        fontSize: "1.5rem",
      }}
    >
      <Editor scode={startcode} />
      <Question ptext={problemtext} />
    </Box>
  );
};

export default ProblemBox;

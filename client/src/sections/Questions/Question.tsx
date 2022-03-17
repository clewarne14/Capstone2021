import React, { FC } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  SmallScreenProvider,
  useSmallScreen,
} from "../../contexts/SmallScreenContext";
import Navbar from "../../components/Navbar";
import Editor from "../../components/Editor";
import theme from "../../theme";
import Footer from "../../components/Footer";
import { Box, TextField } from "@mui/material";
import PhoneNavigation from "../../components/PhoneNavigation";
import Button from "../../components/Button/Button";

type Props = { ptext: string };

const Question: FC<Props> = ({ ptext }: Props) => {
  const isSmallScreen = useSmallScreen();
  return (
    <Box
      sx={{
        width: "50%",
        textAlign: "center",
        backgroundColor: "#eee",
        marginTop: "1.27rem",
      }}
    >
      {ptext}
      {isSmallScreen && <PhoneNavigation />}
      {
        <Button
          //   onClick={async () => {
          //     const body = { Language: language, Code: code };
          //     const data = await fetch("http://localhost:9000/codeToDockerTemp", {
          //       method: "POST",
          //       body: JSON.stringify(body),
          //       headers: { "Content-Type": "application/json" },
          //     });
          //     alert(data);
          //   }}
          sx={{
            fontSize: "rem",
            color: "black",
            marginTop: "13rem",
            height: "rem",
          }}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          Submit Code
        </Button>
      }
    </Box>
  );
};

export default Question;

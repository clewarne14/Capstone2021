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
import { Box } from "@mui/material";
import PhoneNavigation from "../../components/PhoneNavigation";

type Props = { ptext: string };

const Question: FC<Props> = ({ ptext }) => {
  const isSmallScreen = useSmallScreen();
  return (
    <Box
      sx={{
        width: "50%",
        textAlign: "center",
        backgroundColor: "#eee",
        marginTop: "5rem",
      }}
    >
      {ptext}
      {isSmallScreen && <PhoneNavigation />}
    </Box>
  );
};

export default Question;

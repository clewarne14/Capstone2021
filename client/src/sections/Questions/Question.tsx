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

type Props = { problemtext: string };

const Question: FC<Props> = ({ problemtext }) => {
  //return <header>as;dlfkjas;klf</header>;
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
      {isSmallScreen && <PhoneNavigation />}
    </Box>
  );
};

export default Question;

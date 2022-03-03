import React from "react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/Editor";
import theme from "./theme";
import Question from "./sections/Questions/Question";
import { Box } from "@mui/system";
import ProblemBox from "./ProblemBox/ProblemBox";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SmallScreenProvider>
          <Navbar />
          <ProblemBox
            startcode="public static void main(String[] args)"
            problemtext="Sample Problem"
          />
          <Footer />
        </SmallScreenProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

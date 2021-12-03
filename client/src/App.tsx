import React from "react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/Editor";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SmallScreenProvider>
          <Navbar />
          <Footer />
        </SmallScreenProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

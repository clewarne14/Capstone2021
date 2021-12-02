import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/Editor";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

import React from "react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import theme from "./theme";
import Routes from "./Routes";
import "./App.css";

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <SmallScreenProvider>
        <Navbar />
        <Routes />
        <Footer />
      </SmallScreenProvider>
    </ThemeProvider>
  </>
);

export default App;

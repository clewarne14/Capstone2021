import React from "react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import Navbar from "./components/Navbar/Navbar";
import theme from "./theme";
import Routes from "./Routes";
import "./App.css";
import PhoneNavigation from "./components/PhoneNavigation";

const App = () => (
  <div className="page-container">
    <ThemeProvider theme={theme}>
      <SmallScreenProvider>
        <Navbar />
        <Routes />
        <PhoneNavigation />;
      </SmallScreenProvider>
    </ThemeProvider>
  </div>
);

export default App;

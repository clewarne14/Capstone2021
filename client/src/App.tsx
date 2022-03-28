import React from "react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenWrapper } from "./contexts/SmallScreenContext";
import { AlertContextWrapper } from "./contexts/AlertContext";
import Navbar from "./components/Navbar/Navbar";
import PhoneNavigation from "./components/PhoneNavigation";
import theme from "./theme";
import Routes from "./Routes";
import "./App.css";

const languages = ["python", "javascript"];

const App = () => (
  <div className="page-container">
    <ThemeProvider theme={theme}>
      <AlertContextWrapper>
        <SmallScreenWrapper>
          <Navbar />
          <Routes />
          <PhoneNavigation />;
        </SmallScreenWrapper>
      </AlertContextWrapper>
    </ThemeProvider>
  </div>
);

export default App;

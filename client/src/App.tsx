import React from "react";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import { AlertContextProvider } from "./contexts/AlertContext";
import Navbar from "./components/Navbar/Navbar";
import PhoneNavigation from "./components/PhoneNavigation";
import theme from "./theme";
import Routes from "./Routes";
import "./App.css";

const auth: Auth0ProviderOptions = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? "",
  domain: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
  redirectUri: "https://localhost:3000",
};

const App = () => (
  <div className="page-container">
    <Auth0Provider {...auth}>
      <ThemeProvider theme={theme}>
        <AlertContextProvider>
          <SmallScreenProvider>
            <Navbar />
            <Routes />
            <PhoneNavigation />;
          </SmallScreenProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </Auth0Provider>
  </div>
);

export default App;

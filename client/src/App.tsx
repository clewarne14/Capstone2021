import React from "react";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import { AlertContextProvider } from "./contexts/AlertContext";
import { AuthUserContextProvider } from "./contexts/AuthUserContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import Navbar from "./components/Navbar/Navbar";
import PhoneNavigation from "./components/PhoneNavigation";
import theme from "./theme";
import Routes from "./Routes";
import "./App.css";
import isIFrame from "./hooks/iseIFrame";

const auth: Auth0ProviderOptions = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? "",
  domain: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
  scope: process.env.REACT_APP_AUTH0_SCOPE ?? "",
  audience: process.env.REACT_APP_AUTH0_AUDIENCE ?? "",
  redirectUri: "http://localhost:3000",
};

const App = () => (
  <div className="page-container">
    <Auth0Provider {...auth}>
      <AuthUserContextProvider>
        <ThemeProvider theme={theme}>
          <AlertContextProvider>
            <LoadingContextProvider>
              <SmallScreenProvider>
                {isIFrame() && <Navbar />}
                <Routes />
                <PhoneNavigation />;
              </SmallScreenProvider>
            </LoadingContextProvider>
          </AlertContextProvider>
        </ThemeProvider>
      </AuthUserContextProvider>
    </Auth0Provider>
  </div>
);

export default App;

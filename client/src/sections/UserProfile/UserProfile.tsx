import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Grid, Typography } from "@mui/material";
import TightWrapper from "../../components/TightWrapper";

const UserProfile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const data = await fetch(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users?search_engine=v3`,
        { headers: { authorization: `Bearer ${token}` } }
      );
    })();
  }, []);

  return (
    <TightWrapper>
      <Grid item sm={4}></Grid>
      <Grid item sm={8}>
        <Typography variant="h4">
          Hi! My name is Adrian Ronquillo. I'm one of the creators of this
          website! I hope you enjoy it!
        </Typography>
      </Grid>
    </TightWrapper>
  );
};

export default UserProfile;

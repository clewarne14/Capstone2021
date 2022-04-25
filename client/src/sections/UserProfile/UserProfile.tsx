import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Grid, Typography } from "@mui/material";
import TightWrapper from "../../components/TightWrapper";
import { User } from "../../Routes";

const UserProfile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const [viewedUser, setViewedUser] = useState<User>();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const user = await fetch(`http://localhost:4000/user/${username}`);
      const userResponse: User = await user.json();
      setViewedUser(userResponse);
    })();
  }, [username]);

  return viewedUser ? (
    <TightWrapper>
      <Grid display="flex" flexDirection="column" item container sm={4}>
        <Grid item>{viewedUser.username}</Grid>
        <Grid item>
          <img
            src={viewedUser.profilePicture ?? "empty_avatar.png"}
            alt={viewedUser.username}
          />
        </Grid>
      </Grid>
      <Grid item sm={8}>
        <Typography variant="h4">
          {viewedUser.bio ?? `Hi I'm ${viewedUser.username}`}
        </Typography>
      </Grid>
    </TightWrapper>
  ) : (
    <>No user found</>
  );
};

export default UserProfile;

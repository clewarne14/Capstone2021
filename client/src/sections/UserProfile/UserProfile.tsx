import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

const UserProfile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated, user } = useAuth0();
  return <div>{username}</div>;
};

export default UserProfile;

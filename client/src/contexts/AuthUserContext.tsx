import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../Routes";

const emptyUser: User = {
  email: "",
  lists: "",
  problemsCreated: "",
  problemsSolved: "",
  reputation: 0,
  username: "",
  bio: "",
};

const AuthUserContext = createContext<User>(emptyUser);

const AuthUserContextWrapper = AuthUserContext.Provider;

type Props = {
  children: ReactNode;
};

const useUser = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("Error building User context");
  return context;
};

const AuthUserContextProvider: FC<Props> = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<User>(emptyUser);

  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
        const userResponse = await fetch(
          `http://localhost:4000/user/email/${user.email}`
        );
        const userData = await userResponse.json();
        setCurrentUser(userData);
      })();
    } else setCurrentUser(emptyUser);
  }, [isAuthenticated, user]);

  return (
    <AuthUserContextWrapper value={currentUser}>
      {children}
    </AuthUserContextWrapper>
  );
};

export { AuthUserContextProvider, useUser };

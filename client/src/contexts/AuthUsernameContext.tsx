import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthUsernameContext = createContext<string>("");

const AuthUsernameContextWrapper = AuthUsernameContext.Provider;

type Props = {
  children: ReactNode;
};

const useUsername = () => useContext(AuthUsernameContext);

const AuthUsernameContextProvider: FC<Props> = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuth0();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
        const usernameResponse = await fetch(
          `http://localhost:4000/user/email/${user.email}`
        );
        const usernameData = await usernameResponse.json();
        setUsername(usernameData.username);
      })();
    }
  }, [isAuthenticated, user]);

  return (
    <AuthUsernameContextWrapper value={username}>
      {children}
    </AuthUsernameContextWrapper>
  );
};

export { AuthUsernameContextProvider, useUsername };

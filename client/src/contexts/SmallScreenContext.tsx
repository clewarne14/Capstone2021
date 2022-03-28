import React, { createContext, FC, ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SmallScreenContext = createContext(false);

const SmallScreenProvider = SmallScreenContext.Provider;

const useSmallScreen = () => useContext(SmallScreenContext);

type Props = {
  children: ReactNode;
};

const SmallScreenWrapper: FC<Props> = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <SmallScreenProvider value={isSmallScreen}>{children}</SmallScreenProvider>
  );
};

export { SmallScreenWrapper, useSmallScreen };

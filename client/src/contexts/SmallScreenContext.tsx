import React, { createContext, FC, ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SmallScreenContext = createContext(false);

const SmallScreenWrapper = SmallScreenContext.Provider;

const useSmallScreen = () => useContext(SmallScreenContext);

type Props = {
  children: ReactNode;
};

const SmallScreenProvider: FC<Props> = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <SmallScreenWrapper value={isSmallScreen}>{children}</SmallScreenWrapper>
  );
};

export { SmallScreenProvider, useSmallScreen };

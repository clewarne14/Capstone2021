import React, { createContext, FC, ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SmallScreenContext = createContext(false);

const IsSmallScreen = SmallScreenContext.Provider;

const useSmallScreen = () => useContext(SmallScreenContext);

type Props = {
  children: ReactNode;
};

const SmallScreenProvider: FC<Props> = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return <IsSmallScreen value={isSmallScreen}>{children}</IsSmallScreen>;
};

export { SmallScreenProvider, useSmallScreen };

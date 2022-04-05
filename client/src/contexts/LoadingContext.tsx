import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext<Dispatch<SetStateAction<boolean>> | null>(
  null
);

const LoadingContextWrapper = LoadingContext.Provider;

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("Error");
  return context;
};

type Props = {
  children: ReactNode;
};

const LoadingContextProvider: FC<Props> = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
  }, [isLoading]);

  return (
    <LoadingContextWrapper value={setIsLoading}>
      <Loading isLoading={isLoading} />
      {children}
    </LoadingContextWrapper>
  );
};

export { LoadingContextProvider, useLoading };

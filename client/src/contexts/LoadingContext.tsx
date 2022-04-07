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

type LoadingProps = {
  active: boolean;
  delay: number; // This is the delay before the loading finishes
};

const LoadingContext = createContext<Dispatch<
  SetStateAction<LoadingProps>
> | null>(null);

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
  const [isLoading, setIsLoading] = useState({ active: false, delay: 1000 });

  useEffect(() => {
    if (isLoading.active) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.body.style.overflow = "scroll";
        setIsLoading({ active: false, delay: 1000 });
      }, isLoading.delay);
    } else document.body.style.overflow = "scroll";
  }, [isLoading]);

  return (
    <LoadingContextWrapper value={setIsLoading}>
      <Loading isLoading={isLoading.active} />
      {children}
    </LoadingContextWrapper>
  );
};

export { LoadingContextProvider, useLoading };

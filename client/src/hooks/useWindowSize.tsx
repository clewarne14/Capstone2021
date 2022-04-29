import React, { useEffect, useState } from "react";

type WindowSize = { width: number; height: number };

const useWindowDimensions = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });
      });
  }, []);

  return windowSize;
};

export default useWindowDimensions;

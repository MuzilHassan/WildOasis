import { useEffect } from "react";

function useEscapeKey(close) {
  useEffect(() => {
    const handleKeyPress = (key) => {
      if (key.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [close]);
  return;
}

export default useEscapeKey;

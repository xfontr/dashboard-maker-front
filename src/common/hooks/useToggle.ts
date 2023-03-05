import { useState } from "react";

const useToggle = (defaultState: boolean = false) => {
  const [isVisible, setVisibility] = useState<boolean>(defaultState);

  const toggleVisibility = (): void => {
    setVisibility((current) => !current);
  };

  const show = () => {
    setVisibility(true);
  };

  return { isVisible, toggleVisibility, show };
};

export default useToggle;

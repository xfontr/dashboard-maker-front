import { useState } from "react";

const useToggle = (defaultState: boolean = false): [boolean, () => void] => {
  const [isVisible, setVisibility] = useState<boolean>(defaultState);

  const toggleVisibility = (): void => {
    setVisibility((current) => !current);
  };

  return [isVisible, toggleVisibility];
};

export default useToggle;

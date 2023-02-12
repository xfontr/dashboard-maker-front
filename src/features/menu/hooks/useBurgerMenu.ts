import { useState } from "react";

const useBurgerMenu = () => {
  const [isMenuVisible, setVisibility] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setVisibility((current) => !current);
  };

  return { isMenuVisible, toggleVisibility };
};

export default useBurgerMenu;

import { useState } from "react";

const useModal = () => {
  const [isActive, setIsActive] = useState(false);

  const openModal = () => {
    setIsActive((prev) => (prev = true));
  };

  const closeModal = () => {
    setIsActive((prev) => (prev = false));
  };

  return { isActive, openModal, closeModal };
};

export default useModal;

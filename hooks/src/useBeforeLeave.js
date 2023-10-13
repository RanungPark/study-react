import { useEffect } from 'react';

export const useBeforeLeave = (onBefore) => {
  if (!onBefore || typeof onBefore !== "function") {
    return;
  }

  const leaving = (event) => {
    const { clientY } = event;
    if (clientY) {
      onBefore();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseleave", leaving);
    return () => document.removeEventListener("mouseleave", leaving);
  }, []);
};

import React, { useState, useContext, useCallback } from 'react';

export const initialPopperContext = {
  setCurrentPopperId: () => undefined,
  isPopperOpen: () => false,
};

export const UsePopperContext = React.createContext(initialPopperContext);

export const usePopper = (
  currentId,
) => {
  const { setCurrentPopperId, isPopperOpen } = useContext(UsePopperContext);

  const popperOpen = isPopperOpen(currentId);

  const togglePopper = useCallback(() => {
    setCurrentPopperId(popperOpen ? null : currentId);
  }, [currentId, popperOpen, setCurrentPopperId]);

  const setPopperStatus = useCallback(
    (open) => {
      setCurrentPopperId(open ? currentId : null);
    },
    [currentId, setCurrentPopperId],
  );

  return { togglePopper, popperOpen, setPopperStatus };
};

export const usePopperCloser = ()  => {
  const { setCurrentPopperId } = useContext(UsePopperContext);

  const closePoppers = () => setCurrentPopperId(null);

  return { closePoppers };
};

export const PopperContextProvider = ({ children }) => {
  const [currentPopperId, setCurrentPopperId] = useState(null);

  const isPopperOpen = (popperId) => currentPopperId === popperId;

  return <UsePopperContext.Provider value={{ setCurrentPopperId, isPopperOpen }}>{children}</UsePopperContext.Provider>;
};
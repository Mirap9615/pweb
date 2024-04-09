import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [isCursorPurchased, setIsCursorPurchased] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const fetchStates = async () => {
    const cursorStateResponse = await fetch('/api/getCursorState').then(res => res.json());
    setIsCursorPurchased(cursorStateResponse.isCursorPurchased);

    const clickCountResponse = await fetch('/api/getIncrementCount').then(res => res.json());
    console.log("New clickCount:", clickCountResponse.IncrementCount); 
    setClickCount(clickCountResponse.IncrementCount);
  };

  useEffect(() => {
    fetchStates();
  }, []); 

  useEffect(() => {
    if (isCursorPurchased) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
  }, [isCursorPurchased]);

  return (
    <AppStateContext.Provider value={{
      isCursorPurchased,
      setIsCursorPurchased,
      clickCount,
      setClickCount,
      fetchStates
    }}>
      {children}
    </AppStateContext.Provider>
  );
};
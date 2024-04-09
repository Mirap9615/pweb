import React from 'react';
import './App.css'
import './Universal.css'
import { useAppState } from './AppStateProvider'; 

function Head() {
  // use hook to access the global state as ordained 
  const { clickCount } = useAppState();
  console.log("Current clickCount in Head:", clickCount);

  /* inline style */
  const fixedStyle = {
    position: 'fixed',
    top: '4px',    
    right: '10px',    
    zIndex: 1000, 
  };

  return (
    <>
      <button className='button' style={fixedStyle}>
          Count is {clickCount}
      </button>
    </>
  )
}

export default Head

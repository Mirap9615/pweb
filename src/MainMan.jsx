import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Head from './Head';
import App from './App';
import Zone from './Zone';
import Shop from './Shop';
import './MainMan.css'

function MainMan() {
  const [count, setCount] = useState(0);
  const [isCursorPurchased, setIsCursorPurchased] = useState(false);

  useEffect(() => {
    if (isCursorPurchased) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }

    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, [isCursorPurchased]); // will rerun when isCursorPurchased updates 

  return (
    <>
      <Menu />
      <Head count={count} setCount={setCount} />
      <App count={count} setCount={setCount} />
      <Zone count={count} setCount={setCount} />
      <Shop count={count} setCount={setCount} isCursorPurchased={isCursorPurchased} setIsCursorPurchased={setIsCursorPurchased}/>
    </>
  );
}

export default MainMan;
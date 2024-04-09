import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Head from './Head';
import App from './App';
import Zone from './Zone';
import Shop from './Shop';
import './MainMan.css';

function MainMan() {

  return (
    <>
      <Menu />
      <Head />
      <App />
      <Zone />
      <Shop />
    </>
  );
}

export default MainMan;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMan from './MainMan.jsx';
import AniPage from './AniPage.jsx';
import Portfolio from './Portfolio.jsx'
import NotFound from './NotFound.jsx'; 
import ChartsMainMan from './ChartsMainMan.jsx';
import ReviewsMainMan from './ReviewsMainMan.jsx';
import MALUserSearch from './MALUserSearch.jsx';
import SignUpForm from './SignUpForm.jsx';
import Settings from './Settings.jsx';
import Cool from './Cool.jsx';
import Scrape from './Scrape.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMan />} />
        <Route path="/home" element={<MainMan />} />
        <Route path="/page" element={<AniPage />}/>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/charts" element={<ChartsMainMan />} />
        <Route path="/reviews" element={<ReviewsMainMan />} />
        <Route path="/searchMAL" element={<MALUserSearch />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/cool" element={<Cool />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/scrape" element={<Scrape />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

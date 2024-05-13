import Discover from './pages/Discover';
import MovieInfo from './pages/MovieInfo';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import CelebrityInfo from './pages/CelebrityInfo';
import Tv from './pages/Tv';
import TvInfo from './pages/TvInfo';
import Info from './pages/Info';

function App() {
  const [goToTop, showTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      var scrolled = window.scrollY;
      if (scrolled > 300) {
        showTop(true);
      } else {
        showTop(false);
      }
    });
  })

  return (
    <div className="App text-white">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/trending/:trendings" element={<Info />} />
          <Route exact path='/result/:mvname' element={<Result />} />
          <Route exact path='/movies/movieinfo/:movieid' element={<MovieInfo />} />
          <Route exact path='/discover/:discover?' element={<Discover />} />
          <Route exact path='/people/:celebname/:celebid' element={<CelebrityInfo />} />
          <Route exact path='/discover/tv/:tv' element={<Tv />} />
          <Route exact path='/tv/tvinfo/:tvid' element={<TvInfo />} />
        </Routes>
      </Router>
      {goToTop && (
        <div className='fixed bottom-6 left-4 bg-gray-500 text-white h-9 w-9 rounded-full flex items-center justify-center shadow-md shadow-slate-900'>
          <button
            onClick={() => window.scrollTo(0, 0)}
          >
            <IoIosArrowUp />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

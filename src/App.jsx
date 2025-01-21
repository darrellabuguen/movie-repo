import Discover from './pages/Discover';
import MovieInfo from './pages/MovieInfo';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import CelebrityInfo from './pages/CelebrityInfo';
import TvInfo from './pages/TvInfo';
import Trending from './pages/Trending';
import ButtonUp from './components/ButtonUp';
import PopularPage from './pages/PopularPage';
import Genre from './pages/Genre';

function App() {
  return (
    <div className="App text-white">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/trending/:trendings/:pagenum" element={<Trending />} />
          <Route exact path='/result/:mvname/:movieon/:tvon/:peopleon/:pagenum' element={<Result />} />
          <Route exact path='/movies/movieinfo/:moviename/:movieid' element={<MovieInfo />} />
          <Route exact path='/discover/:discover/:pagenum' element={<Discover />} />
          <Route exact path='/people/:celebname/:celebid' element={<CelebrityInfo />} />
          {/* <Route exact path='/discover/tv/:pagenum' element={<Tv />} /> */}
          {/* <Route exact path='/tv/tvinfo/:tvname/:tvid/' element={<TvInfo />} /> */}
          <Route exact path='/tv/tvinfo/:tvname/:tvid/:season/:episode' element={<TvInfo />} />
          <Route exact path='/popular/:type/:pagenum' element={<PopularPage />} />
          <Route exact path='/genre/:type/:genre/:pagenum' element={<Genre />} />
          <Route exact path='/genre/:type/:pagenum' element={<Genre />} />
        </Routes>
      </Router>
      <ButtonUp />
    </div>
  );
}

export default App;

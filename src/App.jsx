import Discover from './pages/Discover';
import MovieInfo from './pages/MovieInfo';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import CelebrityInfo from './pages/CelebrityInfo';
import Tv from './pages/Tv';
import TvInfo from './pages/TvInfo';
import Info from './pages/Info';
import ButtonUp from './components/ButtonUp';
import PopularPage from './pages/PopularPage';

function App() {
  return (
    <div className="App text-white">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/trending/:trendings/:pagenum" element={<Info />} />
          <Route exact path='/result/:mvname/:movieon/:tvon/:peopleon/:pagenum' element={<Result />} />
          <Route exact path='/movies/movieinfo/:moviename/:movieid' element={<MovieInfo />} />
          <Route exact path='/discover/:discover/:pagenum' element={<Discover />} />
          <Route exact path='/people/:celebname/:celebid' element={<CelebrityInfo />} />
          <Route exact path='/discover/tv/:pagenum' element={<Tv />} />
          <Route exact path='/tv/tvinfo/:tvname/:tvid' element={<TvInfo />} />
          <Route exact path='/popular/:type/:pagenum' element={<PopularPage />} />
        </Routes>
      </Router>
      <ButtonUp />
    </div>
  );
}

export default App;

import Popular from '../components/Popular'
import Upcoming from '../components/Upcoming'
import Genre from './Genre';

const Home = () => {
    var title = document.querySelector("title");
    title.innerText = "Movie Repo";
    return (
        <div className='mx-auto max-w-7xl  p-3 lg:px-8'>
            <Upcoming />
            <Popular type="movie" time="day" />
            <Popular type="tv" time="day" />
            <Popular type="person" time="week" />
            <Genre type="movie" genre="28" name="Action" /> {/*genre action*/}
        </div>
    )
}

export default Home
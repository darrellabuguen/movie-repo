import Trending from '../components/Trending'
import Upcoming from '../components/Upcoming'
import Topweek from '../components/Topweek'
import Random from '../components/Random'

const Home = () => {
    var title = document.querySelector("title");
    title.innerText = "Movie Repo";
    return (
        <div className='mx-auto max-w-7xl  p-3 lg:px-8'>
            <Upcoming />
            <Trending />
            <Topweek />
            <Random />
        </div>
    )
}

export default Home
import Trendings from '../components/Trendings'
import Upcoming from '../components/Upcoming'
import Random from '../components/Random'

const Home = () => {
    var title = document.querySelector("title");
    title.innerText = "Movie Repo";
    return (
        <div className='mx-auto max-w-7xl  p-3 lg:px-8'>
            <Upcoming />
            <Trendings type="movie" time="day" />
            <Trendings type="movie" time="week" />
            <Random />
        </div>
    )
}

export default Home
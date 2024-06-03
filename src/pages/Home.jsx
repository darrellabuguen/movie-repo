import Popular from '../components/Popular'
import Upcoming from '../components/Upcoming'

const Home = () => {
    var title = document.querySelector("title");
    title.innerText = "Movie Repo";
    return (
        <div className='mx-auto max-w-7xl  p-3 lg:px-8'>
            <Upcoming />
            <h1 className='my-3 text-3xl text-blue-500 max-sm:text-2xl font-semibold'>Popular</h1>
            <Popular type="movie" time="day" />
            <Popular type="tv" time="day" />
            <Popular type="person" time="week" />
        </div>
    )
}

export default Home
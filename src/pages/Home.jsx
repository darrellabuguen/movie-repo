import Trending from '../components/Trending'
import Upcoming from '../components/Upcoming'
import Topweek from '../components/Topweek'
import Random from '../components/Random'

const Home = () => {
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
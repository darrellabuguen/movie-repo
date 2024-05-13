import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';

const Categories = () => {
    const navigate = useNavigate();
    const { discover } = useParams();
    var separate = discover.split(" ");
    var combined = separate.length === 2 ? separate[0].toLowerCase() + "_" + separate[1].toLowerCase() : discover.toLowerCase();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${combined}?language=en-US&page=1`, "GET");

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {loading &&
                <Loading />
            }
            {error && <div>{error}</div>}
            {data && (
                <>
                    <h1>{discover}</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(movie => {
                                return (
                                    <div
                                        key={movie.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        onClick={() => {
                                            navigate(`/movies/movieinfo/${movie.id}`);
                                        }}
                                    >
                                        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt='img' className='h-full' />
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Categories
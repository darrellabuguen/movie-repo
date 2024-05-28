import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Trendings = (props) => {
    const time = props.time;
    const type = props.type;
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/trending/${type}/${time}?language=en-US`, "GET");

    return (
        <div className='my-3'>
            <h1
                className='text-2xl font-semibold text-blue-500 dark:text-gray-200'
            >
                {time === "day" ? "Trending now" : `Top ${type} of the week`}
            </h1>
            {error && <div>{error}</div>}
            {
                loading &&
                <Loading />
            }
            {data &&
                <>
                    <Splide
                        options={{
                            autoWidth: true,
                            gap: "0.5rem",
                            drag: "free",
                            pagination: false,
                            snap: true
                        }}
                    >
                        {data.results.map(image => {
                            return (
                                <SplideSlide
                                    key={image.id}
                                    className='cursor-pointer w-40'
                                >
                                    <div className='container w-full cursor-pointer'
                                        onClick={() => {
                                            navigate(`/movies/movieinfo/${image.title}/${image.id}`)
                                        }}
                                    >
                                        <img src={"https://image.tmdb.org/t/p/w300/" + image.poster_path} alt='img' className='h-full max-md:w-64' />
                                    </div>
                                </SplideSlide>
                            )
                        })}
                    </Splide>
                    <div className='text-right text-blue-500'>
                        <button>
                            View more
                        </button>
                    </div>
                </>
            }
        </div >
    )
}

export default Trendings
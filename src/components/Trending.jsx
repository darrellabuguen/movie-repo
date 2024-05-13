import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import useLayout from './useLayout';

const Trending = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, "GET");
    const { contPage } = useLayout();

    return (
        <div className='my-3'>
            <h1
                className='text-2xl font-semibold text-blue-500 dark:text-gray-200'
            >
                Trending Now
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
                            snap: true,
                            perPage: contPage
                        }}
                    >
                        {data.results.map(image => {
                            return (
                                <SplideSlide key={image.id}>
                                    <div className='container w-full cursor-pointer'
                                        onClick={() => {
                                            navigate(`/movies/movieinfo/${image.id}`)
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

export default Trending
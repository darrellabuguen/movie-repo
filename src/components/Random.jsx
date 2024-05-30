import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Random = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/trending/all/week?language=en-US`, "GET");

    return (
        <div className='my-3'>
            <h1
                className='text-2xl font-semibold text-blue-500 dark:text-gray-200 mb-2'
            >
                Random
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
                        {data.results.map(movie => {
                            const type = movie.media_type;
                            var img_src = type === "person" ? movie.profile_path : movie.poster_path;
                            var location = type === "person" ? `/people/${movie.name}/${movie.id}` : type === "tv" ? `/tv/tvinfo/${movie.name}/${movie.id}` : `/movies/movieinfo/${movie.title}/${movie.id}`;
                            return (
                                <SplideSlide
                                    key={movie.id}
                                    className='cursor-pointer w-40 text-center'
                                >
                                    <div className='container w-full cursor-pointer'
                                        onClick={() => {
                                            navigate(location);
                                        }}
                                    >
                                        <img src={"https://image.tmdb.org/t/p/w300/" + img_src} alt='img' className='h-full max-md:w-64  rounded-lg' />
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

export default Random
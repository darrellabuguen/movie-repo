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
                className='text-2xl font-semibold text-blue-500 dark:text-gray-200 mb-2'
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
                        {data.results.map(movie => {
                            var img_src = "";
                            var location = "";

                            //check type of collected data
                            switch (type) {
                                case 'movie':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                    location = `/movies/movieinfo/${movie.title}/${movie.id}`;
                                    break;
                                case 'tv':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                    location = `/tv/tvinfo/${movie.name}/${movie.id}`;
                                    break;
                                case 'person':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.profile_path;
                                    location = `/people/${movie.name}/${movie.id}`;
                                    break;
                            }

                            return (
                                <SplideSlide
                                    key={movie.id}
                                    className='cursor-pointer w-40 max-sm:w-28'
                                >
                                    <div className='container w-full cursor-pointer'
                                        onClick={() => {
                                            navigate(location)
                                        }}
                                    >
                                        <img src={img_src} alt='img' className='h-full max-md:w-64 rounded-lg' />
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
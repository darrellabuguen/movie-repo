import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import useFetch from './useFetch';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

const Popular = (props) => {
    const type = props.type;
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`, "GET");
    var more = `/popular/${type}/1`;   //links
    var [hovered, setHover] = useState("opacity-0 w-0");
    var upperType = `${type.split("")[0].toUpperCase()}${type.substring(1)}`   //uppercased type
    const itsHovered = () => {
        setHover("opacity-100 w-full");
    }

    return (
        <div className='my-3'>
            <div
                className='flex items-center gap-2'
                onMouseOver={() => {
                    itsHovered();
                }}
                onMouseLeave={() => {
                    setHover("opacity-0 w-0");
                }}
            >
                <h1
                    className='text-2xl cursor-pointer max-sm:text-xl font-semibold text-blue-500 dark:text-gray-200 mb-2'
                    onClick={() => {
                        navigate(more);
                    }}
                >
                    {upperType}
                </h1>
                <span className='flex items-center transition-all text-blue-500 delay-75'>
                    <Link to={more}
                        className={`text-sm max-sm:text-xl hover:underline hover:text-white transition-all delay-100 ${hovered}`}
                    >
                        Explore
                    </Link>
                    <ChevronRightIcon className='w-5 h-5' />
                </span>
            </div>
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
                                    img_src = "https://image.tmdb.org/t/p/original" + movie.poster_path;
                                    location = `/movies/movieinfo/${movie.title}/${movie.id}`;
                                    break;
                                case 'tv':
                                    img_src = "https://image.tmdb.org/t/p/original" + movie.poster_path;
                                    location = `/tv/tvinfo/${movie.name}/${movie.id}`;
                                    break;
                                case 'person':
                                    img_src = "https://image.tmdb.org/t/p/original" + movie.profile_path;
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
                </>
            }
        </div >
    )
}

export default Popular
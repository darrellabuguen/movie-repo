import React, { useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';

const Upcoming = () => {
    const { data, loading, error } = useFetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', "GET");
    const navigate = useNavigate();
    const [height, setHeight] = React.useState("70vh");
    const checkScreen = () => {
        if (window.innerWidth <= 1024) {
            setHeight("auto");
        } else {
            setHeight("70vh");
        }
    };

    useEffect(() => {
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => {
            window.removeEventListener("resize", checkScreen);
        }
    }, []);

    return (
        <>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {data && <Splide
                options={{
                    pagination: false,
                    rewind: true,
                    autoplay: true,
                    pause: false,
                    interval: 6000,
                    height: height
                }}
            >
                {
                    data.results.map(mv => {
                        return (
                            <SplideSlide
                                key={mv.id}
                                onClick={() => {
                                    navigate(`/movies/movieinfo/${mv.title}/${mv.id}`)
                                }}
                                className=" relative cursor-pointer"
                            >
                                <img src={"https://image.tmdb.org/t/p/original" + mv.backdrop_path} alt='img' className=' w-full' />
                                <div
                                    className='absolute w-full p-4 h-full flex items-end'
                                    style={{
                                        bottom: "0",
                                        background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))"
                                    }}
                                >
                                    <div>
                                        <p className='font-medium max-sm:text-sm md:text-2xl'>{mv.title}</p>
                                        <button className='max-sm:text-sm hover:text-blue-500'>View details</button>
                                    </div>
                                </div>
                            </SplideSlide>
                        )
                    })
                }
            </Splide>}
        </>
    )
}

export default Upcoming
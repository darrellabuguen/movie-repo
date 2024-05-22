import React from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import mvimage from "../assets/nopic-movie.jpg";

const Recommendations = (props) => {
    const id = props.id;
    const type = props.type;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`, "GET");
    const navigate = useNavigate();

    return (
        <>
            <h1 className=' text-blue-500 sm:text-3xl'>You may also like</h1>
            {error && <div>Error fetching data</div>}
            {loading && <div></div>}
            {data && (
                <Splide
                    options={{
                        autoWidth: true,
                        gap: "1rem",
                        drag: "free",
                        pagination: false,
                        snap: true
                    }}
                >
                    {data.results.map(movie => {
                        const type = movie.media_type;
                        var location = type === "movie" ? `/movies/movieinfo/${movie.title}/${movie.id}` : `/tv/tvinfo/${movie.name}/${movie.id}`;
                        var img_title = type === "movie" ? movie.title : movie.name;
                        var image = movie.poster_path !== null ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : mvimage;

                        return (
                            <SplideSlide
                                key={movie.id}
                                onClick={() => {
                                    navigate(location);
                                }}
                                className='cursor-pointer w-40 text-center'
                            >
                                <img src={image} alt="img" className='w-full' />
                                <p
                                    className=' line-clamp-1'
                                    title={img_title}
                                >{img_title}</p>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            )}
        </>
    )
}

export default Recommendations
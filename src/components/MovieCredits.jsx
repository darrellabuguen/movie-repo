import React from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const MovieCredits = (props) => {
    const id = props.id;
    const name = props.name;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, "GET");
    const navigate = useNavigate();

    return (
        <>
            <h1>Movies Featuring {name}</h1>
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
                    {data.cast.map(movie => {
                        const type = movie.media_type;
                        var location = type === "movie" ? `/movies/movieinfo/${movie.title}/${movie.id}` : `/tv/tvinfo/${movie.name}/${movie.id}`;
                        var img_title = type === "movie" ? movie.title : movie.name;

                        return (
                            <SplideSlide
                                key={movie.id}
                                onClick={() => {
                                    navigate(location);
                                }}
                                className='cursor-pointer w-40 text-center'
                            >
                                <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} alt="img" className='w-full' />
                                <p
                                    className=' line-clamp-1'
                                >{img_title}</p>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            )}
        </>
    )
}

export default MovieCredits
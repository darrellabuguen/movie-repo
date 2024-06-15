import React from 'react'
import useFetch from './useFetch'
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import mvimage from "../assets/nopic-movie.jpg";

const MovieCredits = (props) => {
    const id = props.id;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, "GET");

    return (
        <>
            <h1 className='mb-2 text-xl border-l-4 border-blue-500 pl-2 mt-2'>Known for</h1>
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
                        var location = type === "movie" ? `/movies/movieinfo/${encodeURIComponent(movie.title)}/${movie.id}` : `/tv/tvinfo/${encodeURIComponent(movie.name)}/${movie.id}`;
                        var img_title = type === "movie" ? movie.title : movie.name;
                        var image = movie.poster_path !== null ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : mvimage;

                        return (
                            <SplideSlide
                                key={movie.id}
                                className='cursor-pointer w-40 text-center'
                            >
                                <Link to={location}>
                                    <img src={image} alt="img" className='w-full rounded-lg' />
                                    <p
                                        className=' line-clamp-1'
                                        title={img_title}
                                    >{img_title}</p>
                                </Link>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            )}
        </>
    )
}

export default MovieCredits
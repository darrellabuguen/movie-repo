import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Cast from '../components/Cast';
import mvimage from "../assets/nopic-movie-banner.jpg";
import Recommendations from '../components/Recommendations';
import MtvInfo from '../components/MtvInfo';

const MovieInfo = () => {
    const { moviename, movieid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, "GET", `${movieid}`);
    var title_tag = document.querySelector("title");
    title_tag.innerText = `${moviename} | Movie Info`; //change the title
    const img_condition = "https://image.tmdb.org/t/p/original/null";

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>Getting movie info...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8 max-sm:px-2'>
            {data &&
                (
                    <>
                        <h1 className=' text-2xl max-sm:text-xl border-l-4 border-blue-500 pl-2 mb-2'>{data.title}</h1>
                        <div>
                            {/* <img src={
                                img_condition === `https://image.tmdb.org/t/p/original/${data.backdrop_path}` ? mvimage : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
                            }
                                alt='img'
                                className=' rounded-lg mb-3'
                            /> */}
                            <div
                                style={{
                                    height: window.innerWidth < 1080 ? "50svh" : "80svh"
                                }}
                                className=' rounded-lg overflow-hidden'
                            >
                                <iframe src={`https://vidsrc.to/embed/movie/${movieid}`} width="100%" height="100%" allowFullScreen={true}></iframe>
                            </div>
                        </div>
                        <br />
                        {/* <Cast id={movieid} type="movie" /> */}
                        <MtvInfo id={data.id} type="movie" />
                        <br />
                        <Recommendations id={movieid} type="movie" />
                    </>
                )}
        </div>
    )
}

export default MovieInfo
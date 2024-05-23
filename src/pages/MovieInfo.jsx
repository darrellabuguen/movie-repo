import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Cast from '../components/Cast';
import mvimage from "../assets/nopic-movie-banner.jpg";
import Recommendations from '../components/Recommendations';

const MovieInfo = () => {
    const { moviename, movieid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, "GET");
    var title_tag = document.querySelector("title");
    title_tag.innerText = `${moviename} | Movie Info`; //change the title
    const [con_height, setHeight] = useState("h-16");
    const [visible, setVisibility] = useState("block");
    const [more, setMore] = useState("See More");
    const img_condition = "https://image.tmdb.org/t/p/original/null";

    const checkDescriptionHeight = () => {
        const description_con = document.querySelector(".desc_con");
        const description = document.querySelector(".desc");
        if (description) {
            if (description.scrollHeight == description_con.scrollHeight) {
                setVisibility("");
            } else {
                setVisibility("hidden")
            };
        }
    }

    useEffect(() => {
        checkDescriptionHeight();
        window.addEventListener("resize", checkDescriptionHeight);
    });

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {error && <div>{error}</div>}
            {loading && <div>Getting movie info...</div>}
            {data &&
                (
                    <>
                        <h1 className=' text-2xl'>{data.title}</h1>
                        <div>
                            <img src={
                                img_condition === `https://image.tmdb.org/t/p/original/${data.backdrop_path}` ? mvimage : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
                            }
                                alt='img'
                                className='h-full'
                            />
                            <h1>Description:</h1>
                            <div className={`desc_con overflow-hidden ${con_height}`}>
                                <p
                                    className={`text-gray-300 desc`}
                                >{data.overview}</p>
                            </div>
                            <div
                                className={`text-blue-500 cursor-pointer ${visible}`}
                                onClick={() => {
                                    if (con_height === "h-16") {
                                        setHeight("max-h-full");
                                        setMore("See Less");
                                    } else {
                                        setHeight("h-16");
                                        setMore("See More");
                                    }
                                }}
                            >{more}</div>
                        </div>
                        <Cast id={movieid} type="movie" />
                        <Recommendations id={movieid} type="movie" />
                    </>
                )}
        </div>
    )
}

export default MovieInfo
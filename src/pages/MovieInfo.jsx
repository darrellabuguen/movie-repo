import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Cast from '../components/Cast';
import mvimage from "../assets/nopic-movie-banner.jpg";
import Recommendations from '../components/Recommendations';

const MovieInfo = () => {
    const { moviename, movieid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, "GET", `${movieid}`);
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

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>Getting movie info...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
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
                            <br />
                            <div className='flex gap-4 max-sm:flex-col'>
                                <div className=' w-40 flex-shrink-0'>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                        alt="img"
                                    />
                                </div>
                                <div>
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
                                    <table className='w-96'>
                                        <tbody>
                                            <tr>
                                                <td>Release Date: {data.release_date}</td>
                                                <td>Rating: {data.vote_average}</td>
                                            </tr>
                                            <tr>
                                                <td>Runtime: {data.runtime} min</td>
                                                <td>Budget: {data.budget}</td>
                                            </tr>
                                            <tr>
                                                <td>Revenue: {data.revenue}</td>
                                                <td>Status: {data.status}</td>
                                            </tr>
                                            <tr>
                                                <td>Language: {data.original_language}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Cast id={movieid} type="movie" />
                        <Recommendations id={movieid} type="movie" />
                    </>
                )}
        </div>
    )
}

export default MovieInfo
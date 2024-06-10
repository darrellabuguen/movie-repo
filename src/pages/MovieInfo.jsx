import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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

    useEffect(() => {
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
        checkDescriptionHeight();
        window.addEventListener("resize", checkDescriptionHeight);
        return () => {
            window.removeEventListener("resize", checkDescriptionHeight);
        }
    });

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>Getting movie info...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8 max-sm:px-2'>
            {data &&
                (
                    <>
                        <h1 className=' text-2xl max-sm:text-xl border-l-4 border-blue-500 pl-2 mb-2'>{data.title}</h1>
                        <div>
                            <img src={
                                img_condition === `https://image.tmdb.org/t/p/original/${data.backdrop_path}` ? mvimage : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
                            }
                                alt='img'
                                className='h-full rounded-lg mb-3'
                            />
                            <div className='flex gap-4 max-sm:flex-col'>
                                <div className=' w-40 flex-shrink-0 max-sm:hidden'>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                        alt="img"
                                        className='rounded-lg'
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
                                    <div className='flex gap-4 max-sm:flex-col max-sm:gap-0 mt-1 text-gray-300'>
                                        <div>
                                            <div>Release Date: {data.release_date}</div>
                                            <div>Runtime: {data.runtime} min</div>
                                            <div>Revenue: {data.revenue}</div>
                                            <div>Language: {data.original_language}</div>
                                        </div>
                                        <div>
                                            <div className='break-words'>
                                                <span>Genre: </span>
                                                {data.genres.map((genre, index) => {
                                                    return (
                                                        <>
                                                            <Link
                                                                key={genre.id}
                                                                to={`/movie/${genre.id}/${genre.name}/1`}
                                                                className='mr-2 hover:text-blue-500 max-sm:underline max-sm:text-blue-500'
                                                            >
                                                                {genre.name}
                                                                {index == data.genres.length - 1 ? "" : ","}
                                                            </Link>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div>Rating: {data.vote_average}</div>
                                            <div>Budget: {data.budget}</div>
                                            <div>Status: {data.status}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Cast id={movieid} type="movie" />
                        <br />
                        <Recommendations id={movieid} type="movie" />
                    </>
                )}
        </div>
    )
}

export default MovieInfo
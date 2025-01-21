import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from './useFetch'

const Overview = (props) => {
    const id = props.id;
    const type = props.type;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, "GET", `${id}`);

    return (
        <>
            {error && <div>Error fetching data</div>}
            {loading && <div></div>}
            {data &&
                <div
                    className='max-h-[400px] overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-400
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
                >
                    {type == "movie" && (
                        <div className='flex gap-4 max-sm:flex-col'>
                            <div className=' w-40 flex-shrink-0 max-sm:hidden'>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                    alt="img"
                                    className='rounded-lg'
                                    loading='lazy'
                                />
                            </div>
                            <div>

                                <p
                                    className={`text-gray-300 desc`}
                                >{data.overview}</p>
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
                                                    <Link
                                                        key={genre.id}
                                                        to={`/genre/movie/${genre.id}/1`}
                                                        className='mr-2 hover:text-blue-500 max-sm:underline max-sm:text-blue-500'
                                                    >
                                                        {genre.name}
                                                        {index == data.genres.length - 1 ? "" : ","}
                                                    </Link>
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
                    )}
                    {type == "tv" && (
                        <div className='flex gap-4 max-sm:flex-col'>
                            <div className=' w-40 flex-shrink-0 max-sm:hidden'>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                    alt="img"
                                    className='rounded-lg'
                                    loading='lazy'
                                />
                            </div>
                            <div>
                                <div className={`desc_con overflow-hidden`}>
                                    <p
                                        className={`text-gray-300 desc`}
                                    >{data.overview}</p>
                                </div>
                                <div className='flex gap-4 max-sm:flex-col max-sm:gap-0 mt-1 text-gray-300'>
                                    <div>
                                        <div>Released: {data.first_air_date}</div>
                                        <div className='break-words'>
                                            <span>Genre: </span>
                                            {data.genres.map((genre, index) => {
                                                return (
                                                    <Link
                                                        key={genre.id}
                                                        to={`/genre/tv/${genre.id}/1`}
                                                        className='mr-2 hover:text-blue-500 max-sm:underline max-sm:text-blue-500'
                                                    >
                                                        {genre.name}
                                                        {index == data.genres.length - 1 ? "" : ","}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        <div>Runtime: {data.episode_run_time} min</div>
                                        <div>Language: {data.original_language}</div>
                                    </div>
                                    <div>
                                        {data.last_episode_to_air !== null &&
                                            <div>Season/s: {data.last_episode_to_air.season_number}</div>
                                        }
                                        <div>Rating: {data.vote_average}</div>
                                        <div>Status: {data.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Overview
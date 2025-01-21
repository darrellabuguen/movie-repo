import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'

const Episodes = (props) => {
    const id = props.id;
    const seasonsNumber = props.seasons;
    let { tvname, season, episode } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`, "GET");
    const navigate = useNavigate();
    const apiK = import.meta.env.REACT_APP_API_KEY;

    const handleLocation = (e) => {
        let seasonNum = e.target.value;
        const options = {
            method: `GET`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiK}`
            }
        };
        let test = fetch(`https://api.themoviedb.org/3/tv/${id}/season/${e.target.value}?language=en-US`, options);
        test.then(response => console.log(response.status) || response)
            .then(response => { return response.json() })
            .then(body => {
                navigate(`/tv/tvinfo/${tvname}/${id}/${seasonNum}/${body.episodes[0].episode_number}`);
            });
    };

    return (
        <>
            {error && <div>Error fetching data</div>}
            {loading && <div></div>}
            <div className='mb-3'>
                <select
                    name="seasons"
                    value={season}
                    className='season-dropdown text-black p-2 rounded-md'
                    onChange={
                        handleLocation
                    }
                >
                    {Array.from({ length: seasonsNumber }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Season {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            {data &&
                <div
                    className='max-h-[400px] overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-400
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
                >
                    {data.episodes.map((episodes) => (
                        <Link
                            key={episodes.id}
                            to={`/tv/tvinfo/${tvname}/${id}/${episodes.season_number}/${episodes.episode_number}`}
                            className='flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md'
                            style={{
                                backgroundColor: episode == episodes.episode_number ? "#323232" : "#202020"
                            }}
                        >
                            <img src={`https://image.tmdb.org/t/p/original/${episodes.still_path}`} alt={episodes.name} width="150px" height="150px" className='rounded-md' loading='lazy' />
                            <div className='text-gray-400'>
                                <div className='font-semibold'>Episode {episodes.episode_number}</div>
                                <div className='font-bold'>{episodes.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </>
    )
}

export default Episodes
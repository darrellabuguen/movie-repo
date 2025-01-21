import React from 'react'
import useFetch from './useFetch'
import { Link } from 'react-router-dom';
import profile from "../assets/profile1.jpg";

const Cast = (props) => {
    const id = props.id;
    const type = props.type;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, "GET");

    return (
        <>
            {error && <div>Error fetching data</div>}
            {loading && <div></div>}
            {data && (
                <div
                    className='max-h-[400px] overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-400
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
                >
                    <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1 '>
                        {data.cast.map(person => {
                            var location = `/people/${encodeURIComponent(person.name)}/${person.id}`;
                            var image = person.profile_path !== null ? `https://image.tmdb.org/t/p/original/${person.profile_path}` : profile;
                            return (
                                <div
                                    key={person.id}
                                    className='castTag cursor-pointer w-full p-4 rounded-md'
                                >
                                    <Link to={location} className='flex align-center gap-4'>
                                        <img src={image} alt="img" className='w-1/6 rounded-lg' loading='lazy' />
                                        <div>
                                            <p
                                                className='line-clamp-1 font-extrabold'
                                                title={person.name}
                                            >
                                                {person.name}
                                            </p>
                                            <p title={person.character}>
                                                {person.character}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cast
import React from 'react'
import useFetch from './useFetch'
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import profile from "../assets/profile1.jpg";

const Cast = (props) => {
    const id = props.id;
    const type = props.type;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, "GET");

    return (
        <>
            <h1 className='mb-2 text-xl border-l-4 border-blue-500 pl-2 mt-2'>Casts</h1>
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
                    {data.cast.map(person => {
                        var location = `/people/${encodeURIComponent(person.name)}/${person.id}`;
                        var image = person.profile_path !== null ? `https://image.tmdb.org/t/p/original/${person.profile_path}` : profile;
                        return (
                            <SplideSlide
                                key={person.id}
                                className='cursor-pointer w-40 text-center max-sm:w-20 max-sm:text-left'
                            >
                                <Link to={location}>
                                    <img src={image} alt="img" className='w-full rounded-lg' loading='lazy' />
                                    <p
                                        className='line-clamp-1'
                                        title={person.name}
                                    >{person.name}</p>
                                </Link>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            )}
        </>
    )
}

export default Cast
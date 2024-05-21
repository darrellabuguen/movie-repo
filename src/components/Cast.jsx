import React from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Cast = (props) => {
    const id = props.id;
    const type = props.type;
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, "GET");
    const navigate = useNavigate();

    return (
        <>
            <h1>Casts</h1>
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
                        var location = `/people/${person.name}/${person.id}`;
                        return (
                            <SplideSlide
                                key={person.id}
                                onClick={() => {
                                    navigate(location);
                                }}
                                className='cursor-pointer w-40 text-center'
                            >
                                <img src={"https://image.tmdb.org/t/p/original/" + person.profile_path} alt="img" className='w-full' />
                                <p
                                    className='line-clamp-1'
                                >{person.name}</p>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            )}
        </>
    )
}

export default Cast
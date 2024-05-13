import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';

const MovieInfo = () => {
    const { movieid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, "GET");

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {error && <div>{error}</div>}
            {loading && <div>Getting movie info...</div>}
            {data && (
                <>
                    <h1 className=' text-2xl'>{data.title}</h1>
                    <div>
                        <img src={"https://image.tmdb.org/t/p/original/" + data.backdrop_path} alt='img' className='h-full' />
                        <div>
                            <h1>Description:</h1>
                            <p className=' text-gray-300'>{data.overview}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieInfo
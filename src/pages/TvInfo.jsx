import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';

const TvInfo = () => {
    const { tvid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/tv/${tvid}?language=en-US`, "GET");

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {error && <div>{error}</div>}
            {loading && <div>Getting info...</div>}
            {data && (
                <>
                    <h1 className=' text-2xl'>{data.name}</h1>
                    <div>
                        <img src={"https://image.tmdb.org/t/p/original/" + data.backdrop_path} alt='img' className='h-full' />
                    </div>
                </>
            )}
        </div>
    )
}

export default TvInfo
import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Cast from '../components/Cast';

const TvInfo = () => {
    const { tvname, tvid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/tv/${tvid}?language=en-US`, "GET");
    var title = document.querySelector("title");
    title.innerText = `${tvname} | TV Info`; //change the title

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
                    <Cast id={data.id} type="tv" />
                </>
            )}
        </div>
    )
}

export default TvInfo
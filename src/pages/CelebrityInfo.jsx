import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import MovieCredits from '../components/MovieCredits';

const CelebrityInfo = () => {
    const { celebname, celebid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/person/${celebid}?language=en-US`, "GET");
    var title = document.querySelector("title");
    title.innerText = `${celebname} | Celebrity Info`;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {error && <div>{error}</div>}
            {loading && <div>Getting celeb info...</div>}
            {data && (
                <>
                    <h1 className=' text-2xl'>{celebname}</h1>
                    <div>
                        <img src={"https://image.tmdb.org/t/p/w300/" + data.profile_path} alt='img' className='h-full' />
                        <div>
                            <h1>Biography:</h1>
                            <p className=' text-gray-300'>{data.biography}</p>
                        </div>
                    </div>
                    <MovieCredits id={celebid} name={celebname} />
                </>
            )}
        </div>
    )
}

export default CelebrityInfo
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Loading from '../components/Loading';

const Info = () => {
    const navigate = useNavigate();
    const { trendings } = useParams();
    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/trending/${trendings}/day?language=en-US`, "GET");

    return (
        <div
            className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'
        >
            {loading &&
                <Loading />
            }
            {error && <div>{error}</div>}
            {data && (
                <>
                    <h1>{trendings === "person" ? "People" : "Movies"}</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(info => {
                                const type = info.media_type;
                                var img_src = type === "person" ? info.profile_path : info.poster_path;
                                var location = type === "person" ? `/people/${info.name}/${info.id}` : `/movies/movieinfo/${info.id}`;
                                return (
                                    <div
                                        key={info.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        onClick={() => {
                                            navigate(location);
                                        }}
                                    >
                                        <img src={"https://image.tmdb.org/t/p/w500/" + img_src} alt='img' className='h-full' />
                                        <p>{info.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Info
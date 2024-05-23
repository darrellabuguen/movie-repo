import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import mvimage from "../assets/nopic-movie.jpg";

const Info = () => {
    const navigate = useNavigate();
    const { trendings } = useParams();
    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/trending/${trendings}/day?language=en-US`, "GET");
    var title = document.querySelector("title");
    title.innerText = trendings === "person" ? "People" : "Movies";

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
                                var img_src = type === "person" ? `https://image.tmdb.org/t/p/w500${info.profile_path}` : `https://image.tmdb.org/t/p/w500${info.poster_path}`;
                                var location = type === "person" ? `/people/${info.name}/${info.id}` : `/movies/movieinfo/${info.title}/${info.id}`;

                                //check if img_src is not null
                                img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                                return (
                                    <div
                                        key={info.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        onClick={() => {
                                            navigate(location);
                                        }}
                                    >
                                        <img src={img_src} alt='img' className='h-full' />
                                        <p className=' line-clamp-1'>{info.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Pagination page={data.page} total={data.total_pages} />
                </>
            )}
        </div>
    )
}

export default Info
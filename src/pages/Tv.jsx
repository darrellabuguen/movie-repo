import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const Tv = () => {
    const navigate = useNavigate();
    var { pagenum } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    var title = document.querySelector("title");
    title.innerText = `TV | Discover`; //change the title

    const setPageNumber = (number) => {
        navigate(`/discover/tv/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {data && (
                <>
                    <h1>TV</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(telev => {
                                return (
                                    <div
                                        key={telev.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        onClick={() => {
                                            navigate(`/tv/tvinfo/${telev.name}/${telev.id}`);
                                        }}
                                    >
                                        <img src={"https://image.tmdb.org/t/p/w500/" + telev.poster_path} alt='img' className='h-full' />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Pagination page={pagenum} total={data.total_pages} set={setPageNumber} />
                </>
            )}
        </div>
    )
}

export default Tv
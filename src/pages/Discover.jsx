import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const Categories = () => {
    const navigate = useNavigate();
    let { discover, pagenum } = useParams();
    let heading = discover === "top_rated" ? "Top Rated" : discover === "upcoming" ? "Upcoming" : "Now Playing";
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${discover}?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    let title = document.querySelector("title");
    title.innerText = `${heading} | Discover`;

    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
        navigate(`/discover/${discover}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8 max-sm:px-2'>
            {data && (
                <>
                    <h1>{heading}</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(movie => {
                                const year = movie.release_date.split("-")[0];
                                return (
                                    <Link
                                        key={movie.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        to={`/movies/movieinfo/${encodeURIComponent(movie.title)}/${movie.id}`}
                                    >
                                        <div className='h-full relative'>
                                            <div className='absolute top-2 right-2 p-1 bg-white rounded-sm text-black font-bold'>{year}</div>
                                            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt='img' className='h-full rounded-lg' loading='lazy' />
                                        </div>
                                        <p className=' line-clamp-1' title={movie.title}>{movie.title}</p>
                                    </Link>
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

export default Categories
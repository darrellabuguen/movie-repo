import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import mvimage from "../assets/nopic-movie.jpg";

const Info = () => {
    const navigate = useNavigate();
    var { trendings, pagenum } = useParams();
    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/trending/${trendings}/day?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    var title = document.querySelector("title");
    title.innerText = trendings === "person" ? "People" : "Movies";

    const setPageNumber = (number) => {
        navigate(`/trending/${trendings}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'
        >
            {data && (
                <>
                    <h1>{trendings === "person" ? "People" : "Movies"}</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(info => {
                                const type = info.media_type;
                                const year = type !== "person" ? info.release_date.split("-")[0] : "";
                                var img_src = type === "person" ? `https://image.tmdb.org/t/p/w500${info.profile_path}` : `https://image.tmdb.org/t/p/w500${info.poster_path}`;
                                var location = type === "person" ? `/people/${info.name}/${info.id}` : `/movies/movieinfo/${info.title}/${info.id}`;
                                var title = type !== "person" ? info.title : info.name;

                                //check if img_src is not null
                                img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                                return (
                                    <div
                                        key={info.id}
                                        className='container flex flex-col items-center cursor-pointer'
                                        onClick={() => {
                                            navigate(location);
                                        }}
                                    >
                                        <div className='h-full relative'>
                                            {type !== "person" && <div className='absolute top-2 right-2 p-1 bg-white rounded-sm text-black'>{year}</div>}
                                            <img src={img_src} alt='img' className='h-full rounded-lg' />
                                        </div>
                                        <p className=' line-clamp-1'>{title}</p>
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

export default Info
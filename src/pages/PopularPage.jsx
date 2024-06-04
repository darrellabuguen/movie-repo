import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';
import mvimage from "../assets/nopic-movie.jpg";
import Pagination from '../components/Pagination';

const PopularPage = () => {
    const { type, pagenum } = useParams();
    const navigate = useNavigate();

    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    var title = document.querySelector("title");
    title.innerText = `${type} | Popular`; //change the title

    const setPageNumber = (number) => {
        navigate(`/popular/${type}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>
            {data && (
                <>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2 mt-2'>
                        {
                            data.results.map(movie => {
                                var year = "";
                                var img_src = "";
                                var img_title = "";
                                var location = "";

                                //check type of collected data
                                switch (type) {
                                    case 'movie':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                        img_title = movie.title;
                                        location = `/movies/movieinfo/${movie.title}/${movie.id}`;
                                        year = movie.release_date.split("-")[0];
                                        break;
                                    case 'tv':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                        img_title = movie.name;
                                        location = `/tv/tvinfo/${movie.name}/${movie.id}`;
                                        year = movie.first_air_date.split("-")[0];
                                        break;
                                    case 'person':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.profile_path;
                                        img_title = movie.name;
                                        location = `/people/${movie.name}/${movie.id}`;
                                        break;
                                }

                                //check if img_src is not null
                                img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                                return (
                                    <div
                                        key={movie.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        onClick={() => {
                                            navigate(location);
                                        }}
                                    >
                                        <div className='h-full relative'>
                                            {type !== "person" && <div className='absolute top-2 right-2 p-1 bg-white rounded-sm text-black font-bold'>{year}</div>}
                                            <img src={img_src} alt='img' className='h-full rounded-lg' />
                                        </div>
                                        <p
                                            className='line-clamp-1'
                                            title={img_title}
                                        >
                                            {img_title}
                                        </p>
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

export default PopularPage
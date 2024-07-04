import { Link, useParams, useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';
import mvimage from "../assets/nopic-movie.jpg";
import Pagination from '../components/Pagination';

const PopularPage = () => {
    const { type, pagenum } = useParams();
    const navigate = useNavigate();
    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    var title = document.querySelector("title");
    let titleUpper = type === "person" ? "People" : type === "tv" ? "TV" : "Movies";
    title.innerText = `${titleUpper} | Popular`; //change the title

    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
        navigate(`/popular/${type}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>
            <div className='flex items-center justify-end'>
                <select
                    name="popular"
                    id="popular"
                    value={type}
                    className='p-2 border border-gray-500 rounded-md'
                    style={{
                        backgroundColor: "#202020"
                    }}
                    onChange={(e) => {
                        navigate(`/popular/${e.target.value}/1`)
                    }}
                >
                    <option value="movie">Movies</option>
                    <option value="tv">TV</option>
                    <option value="person">People</option>
                </select>
            </div>
            {data && (
                <>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2 mt-2'>
                        {
                            data.results.map(movie => {
                                let img_src = "";
                                let img_title = "";
                                let location = "";

                                //check type of collected data
                                switch (type) {
                                    case 'movie':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                        img_title = movie.title;
                                        location = `/movies/movieinfo/${encodeURIComponent(movie.title)}/${movie.id}`;
                                        break;
                                    case 'tv':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                        img_title = movie.name;
                                        location = `/tv/tvinfo/${encodeURIComponent(movie.name)}/${movie.id}`;
                                        break;
                                    case 'person':
                                        img_src = "https://image.tmdb.org/t/p/w500" + movie.profile_path;
                                        img_title = movie.name;
                                        location = `/people/${encodeURIComponent(movie.name)}/${movie.id}`;
                                        break;
                                }

                                //check if img_src is not null
                                img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                                return (
                                    <Link
                                        key={movie.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        to={location}
                                    >
                                        <div className='h-full relative'>
                                            <img src={img_src} alt='img' className='h-full rounded-lg' />
                                        </div>
                                        <p
                                            className='line-clamp-1'
                                            title={img_title}
                                        >
                                            {img_title}
                                        </p>
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

export default PopularPage
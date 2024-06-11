import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../components/useFetch'
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import mvimage from "../assets/nopic-movie.jpg";

const Info = () => {
    const navigate = useNavigate();
    let { trendings, pagenum } = useParams();
    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/trending/${trendings}/day?language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    let title = document.querySelector("title");
    title.innerText = trendings === "person" ? "People | Trending" : trendings === "tv" ? "TV | Trending" : "Movies | Trending";

    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
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
                    <div className='flex items-center justify-between'>
                        <h1>{trendings === "person" ? "People" : trendings === "tv" ? "TV" : "Movies"}</h1>
                        <select
                            name="trend-type"
                            id="trend-type"
                            className='p-2 border border-gray-500 rounded-md'
                            style={{
                                backgroundColor: "#202020"
                            }}
                            onChange={(e) => {
                                navigate(`/trending/${e.target.value}/1`)
                            }}
                        >
                            <option value="movie">Movies</option>
                            <option value="tv">TV</option>
                            <option value="person">People</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(movie => {
                                let type = trendings !== "person" ? movie.media_type : "person";
                                let img_src = "";
                                let img_title = "";
                                let location = "";
                                let year = "";

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
                                    <Link
                                        key={movie.id}
                                        className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                        to={location}
                                    >
                                        <div className='h-full relative'>
                                            {type !== "person" &&
                                                <div className='absolute top-2 right-2 py-1 px-2 bg-white rounded-sm text-black font-bold'>{year}</div>
                                            }
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

export default Info
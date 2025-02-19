import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';
import mvimage from "../assets/nopic-movie.jpg";
import Pagination from '../components/Pagination';

const Result = () => {
    const { mvname, movieon, tvon, peopleon, pagenum } = useParams();
    const navigate = useNavigate();
    var true_num = [
        ["movie", movieon.split("=")[1]],
        ["tv", tvon.split("=")[1]],
        ["person", peopleon.split("=")[1]]
    ];
    var num = 0;
    var checked = "";
    var notChecked = "";

    for (let i = 0; i < true_num.length; i++) {
        var index = true_num[i];
        for (let k = 0; k < index.length - 1; k++) {
            var isChecked = true_num[i][k + 1];
            if (isChecked == "true") {
                num += 1;
                checked = true_num[i][k];
            } else {
                notChecked = true_num[i][k];
            }
        }
    }

    num < 2 || num === 0 ? notChecked = "" : notChecked;
    var option = num > 1 || num === 0 ? "multi" : checked;

    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/search/${option}?query=${mvname}&include_adult=false&language=en-US&page=${pagenum}`, "GET", `${pagenum}`);
    var title = document.querySelector("title");
    title.innerText = `${mvname} | Search Results`; //change the title

    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
        navigate(`/result/${encodeURIComponent(mvname)}/${movieon}/${tvon}/${peopleon}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>
            {data && (
                <>
                    {data.total_results >= 1 &&
                        <>
                            <div className=' sm:flex sm:justify-between sm:items-center'>
                                <span>Result for <b>{mvname}</b> </span>
                                <span>showing page {pagenum} of {data.total_pages}</span>
                            </div>
                            <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2 mt-2'>
                                {
                                    data.results.map(movie => {
                                        const type = !movie.media_type ? `${checked}` : movie.media_type;
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
                                                location = `/tv/tvinfo/${encodeURIComponent(movie.name)}/${movie.id}/1/1`;
                                                break;
                                            case 'person':
                                                img_src = "https://image.tmdb.org/t/p/w500" + movie.profile_path;
                                                img_title = movie.name;
                                                location = `/people/${encodeURIComponent(movie.name)}/${movie.id}`;
                                                break;
                                        }

                                        //check if img_src is not null
                                        img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                                        if (type !== notChecked) {
                                            return (
                                                <Link
                                                    key={movie.id}
                                                    className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                                    to={location}
                                                >
                                                    <div className=' relative'>
                                                        <div className='absolute top-2 right-2 py-1 px-2 bg-white rounded-sm text-black font-bold'>{type}</div>
                                                        <img src={img_src} alt='img' className=' rounded-lg' loading='lazy' />
                                                    </div>
                                                    <p
                                                        className='line-clamp-1'
                                                        title={img_title}
                                                    >
                                                        {img_title}
                                                    </p>
                                                </Link>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </div>
                            <Pagination page={pagenum} total={data.total_pages} set={setPageNumber} />
                        </>
                    }
                    {data.total_results == 0 && <div className='font-bold text-2xl text-center'>No results found</div>}
                </>
            )}
        </div>
    )
}

export default Result
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Loading from '../components/Loading';

const Result = () => {
    const { mvname, movieon, tvon, peopleon } = useParams();
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

    const { data, error, loading } = useFetch(`https://api.themoviedb.org/3/search/${option}?query=${mvname}&include_adult=false&language=en-US&page=1`, "GET");
    var title = document.querySelector("title");
    title.innerText = `${mvname} | Search Results`; //change the title

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {loading &&
                <Loading />
            }
            {error && <div>{error}</div>}
            {data && (
                <>
                    {console.log(data)}
                    <h1>Result for {mvname}</h1>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
                        {
                            data.results.map(movie => {
                                const type = !movie.media_type ? `${checked}` : movie.media_type;
                                var img_src = type === "person" ? movie.profile_path : movie.poster_path;
                                var img_title = type === "movie" ? movie.title : movie.name;
                                var location = type === "person" ? `/people/${movie.name}/${movie.id}` : type === "tv" ? `/tv/tvinfo/${movie.name}/${movie.id}` : `/movies/movieinfo/${movie.title}/${movie.id}`;

                                if (img_src && type !== notChecked) {
                                    return (
                                        <div
                                            key={movie.id}
                                            className='container flex flex-col justify-center items-center text-center cursor-pointer'
                                            onClick={() => {
                                                navigate(location);
                                            }}
                                        >
                                            <img src={"https://image.tmdb.org/t/p/w500/" + img_src} alt='img' className='h-full' />
                                            <p>{img_title}</p>
                                            <p>{type}</p>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Result
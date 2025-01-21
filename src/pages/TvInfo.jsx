import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import Recommendations from '../components/Recommendations';
import MtvInfo from '../components/MtvInfo';

const TvInfo = () => {
    const { tvname, tvid, season, episode } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/tv/${tvid}?language=en-US`, "GET", `${tvid}`);

    //change the title
    let title = document.querySelector("title");
    title.innerText = `${tvname} | TV Info`;

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>Getting tv info...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8 max-sm:px-2'>
            {data && (
                <>
                    <h1 className=' text-2xl max-sm:text-xl border-l-4 border-blue-500 pl-2 mb-2'>{data.name}</h1>
                    <div
                        style={{
                            height: window.innerWidth < 1080 ? "50svh" : "80svh"
                        }}
                        className=' rounded-lg overflow-hidden'
                    >
                        <iframe src={`https://vidsrc.to/embed/tv/${tvid}/${season}/${episode}`} width="100%" height="100%" allowFullScreen={true}></iframe>
                    </div>
                    <br />
                    {/* <Cast id={data.id} type="tv" /> */}
                    <MtvInfo id={data.id} type="tv" seasons={data.number_of_seasons} />
                    <br />
                    <Recommendations id={data.id} type="tv" />
                </>
            )}
        </div>
    )
}

export default TvInfo
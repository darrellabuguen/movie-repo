import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../components/useFetch';
import MovieCredits from '../components/MovieCredits';

const CelebrityInfo = () => {
    const { celebname, celebid } = useParams();
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/person/${celebid}?language=en-US`, "GET");
    var title = document.querySelector("title");
    title.innerText = `${celebname} | Celebrity Info`;
    const [con_height, setHeight] = useState("h-16");
    const [visible, setVisibility] = useState("block");
    const [more, setMore] = useState("See More");
    const checkDescriptionHeight = () => {
        const description_con = document.querySelector(".desc_con");
        const description = document.querySelector(".desc");
        if (description) {
            if (description.scrollHeight == description_con.scrollHeight) {
                setVisibility("");
            } else {
                setVisibility("hidden")
            };
        }
    }
    useEffect(() => {
        checkDescriptionHeight();
        window.addEventListener("resize", checkDescriptionHeight);
    });

    return (
        <div className='mx-auto max-w-7xl  p-6 lg:px-8'>
            {error && <div>{error}</div>}
            {loading && <div>Getting celeb info...</div>}
            {data && (
                <>
                    <h1 className=' text-2xl'>{celebname}</h1>
                    <div>
                        <img src={"https://image.tmdb.org/t/p/w300/" + data.profile_path} alt='img' className='h-full' />
                        <div>
                            <h1>Biography:</h1>
                            <div className={`desc_con overflow-hidden ${con_height}`}>
                                <p className=' text-gray-300 desc'>{data.biography}</p>
                            </div>
                            <div
                                className={`text-blue-500 cursor-pointer ${visible}`}
                                onClick={() => {
                                    if (con_height === "h-16") {
                                        setHeight("max-h-full");
                                        setMore("See Less");
                                    } else {
                                        setHeight("h-16");
                                        setMore("See More");
                                    }
                                }}
                            >
                                {more}
                            </div>
                        </div>
                    </div>
                    <MovieCredits id={celebid} name={celebname} />
                </>
            )}
        </div>
    )
}

export default CelebrityInfo
import React, { useState } from 'react'
import useFetch from '../components/useFetch';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Loading from '../components/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Pagination from '../components/Pagination';
import genres from '../genre.json';

const Genre = (props) => {
    const navigate = useNavigate();
    const { type, genre, genreName, pagenum } = useParams();    //parameters

    //change parameters if params is not set
    let typeProps = !props.type ? type : props.type;
    let genreProps = !props.genre ? genre : props.genre;
    let pagenumProps = !pagenum ? "1" : pagenum;
    let genreNameProps = !props.name ? genreName : props.name;

    //fetch
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/discover/${typeProps}?include_adult=false&with_genres=${genreProps}&include_video=true&language=en-US&page=${pagenumProps}&sort_by=popularity.desc`, "GET");


    let more = `/${typeProps}/${genreProps}/${genreNameProps}/1`;   //links

    //change the title
    if (type) {
        let title = document.querySelector("title");
        title.innerText = `${genreNameProps} | Genre`;
    }

    //show the link explore if heading is hovered
    let [hovered, setHover] = useState("opacity-0 w-0");
    const itsHovered = () => {
        setHover("opacity-100 w-full");
    }

    //handle for changing page number
    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
        navigate(`/${typeProps}/${genreProps}/${genreNameProps}/${number}`);
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='my-3'>
            {/* Show the heading if type params is not set */}
            {!type && <div
                className='flex items-center gap-2'
                onMouseOver={() => {
                    itsHovered();
                }}
                onMouseLeave={() => {
                    setHover("opacity-0 w-0");
                }}
            >
                <h1
                    className='text-2xl cursor-pointer max-sm:text-xl font-semibold text-blue-500 dark:text-gray-200 mb-2'
                    onClick={() => {
                        navigate(more);
                    }}
                >
                    Popular {genreNameProps} {typeProps}
                </h1>
                <span className='flex items-center transition-all text-blue-500 delay-75'>
                    <Link to={more}
                        className={`text-sm hover:underline hover:text-white transition-all delay-100 ${hovered}`}
                    >
                        Explore
                    </Link>
                    <ChevronRightIcon className='w-5 h-5 max-sm:h-4 max-sm:w-4' />
                </span>
            </div>}

            {/* Load as a carousel when type params is not set */}
            {data && !type &&
                <>
                    <Splide
                        options={{
                            autoWidth: true,
                            gap: "0.5rem",
                            drag: "free",
                            pagination: false
                        }}
                    >
                        {data.results.map(movie => {
                            var img_src = "";
                            var location = "";

                            //check type of collected data
                            switch (props.type) {
                                case 'movie':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                    location = `/movies/movieinfo/${movie.title}/${movie.id}`;
                                    break;
                                case 'tv':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                    location = `/tv/tvinfo/${movie.name}/${movie.id}`;
                                    break;
                            }

                            //check if img_src is not null
                            img_src !== "https://image.tmdb.org/t/p/w500null" ? img_src = img_src : img_src = mvimage;

                            return (
                                <SplideSlide
                                    key={movie.id}
                                    className='cursor-pointer w-40 max-sm:w-28'
                                >
                                    <Link
                                        to={location}
                                        className='container w-full cursor-pointer'
                                    >
                                        <img src={img_src} alt='img' className='h-full max-md:w-64 rounded-lg' />
                                    </Link>
                                </SplideSlide>
                            )
                        })}
                    </Splide>
                </>
            }

            {/* Load as a page when type param is set*/}
            {data && type &&
                <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>
                    <div
                        className='flex items-center justify-between'
                    >
                        <h1>{genreNameProps}</h1>
                        <select
                            name="genreJSON"
                            id="genreJSON"
                            style={{
                                backgroundColor: "#202020",
                            }}
                            className=' border-gray-500 border rounded-md p-2'
                            value={genreNameProps}
                            onChange={(e) => {
                                navigate(`/${typeProps}/${e.target.value}/${e.target.options[e.target.selectedIndex].text}/1`)
                            }}
                        >
                            {genres.genres.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
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
                                            {type !== "person" && <div className='absolute top-2 right-2 p-1 bg-white rounded-sm text-black font-bold'>{year}</div>}
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
                </div>
            }
        </div>
    )
}

export default Genre
import React, { useState } from 'react'
import useFetch from '../components/useFetch';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Loading from '../components/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Pagination from '../components/Pagination';
import genres from '../genre.json';
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import mvimage from "../assets/nopic-movie.jpg";

const Genre = (props) => {
    const navigate = useNavigate();
    const { type, genre, pagenum } = useParams();    //parameters
    const [checkboxes, setCheckboxes] = useState(() => {
        const initialCheckboxes = {};
        genres.genres.map((item) => {
            initialCheckboxes[item.id] = genre == item.id ? true : false;
        });
        return initialCheckboxes;       //this is genre id object
    });

    //handle for checkboxes
    const handleChangeCheckbox = (event) => {
        const { id, checked } = event.target;

        //change state of checkbox
        setCheckboxes((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    }

    //will filter all keys of "checkboxes" that is true/checked
    const genresChecked = Object.keys(checkboxes).filter((item) => checkboxes[item]);

    const combinedGenre = genresChecked.join(', ');

    //change parameters if params is not set
    let typeProps = !props.type ? type : props.type;
    let genreProps = genre ? `&with_genres=${genre}` : !props.genre ? "" : `&with_genres=${props.genre}`;
    let pagenumProps = !pagenum ? "1" : pagenum;
    let genreNameProps = props.name;
    let titlePlaceholder = genre ? `Filter results | Genres` : "Genres";

    //fetch
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/discover/${typeProps}?include_adult=false${genreProps}&include_video=true&language=en-US&page=${pagenumProps}&sort_by=popularity.desc`, "GET");

    let more = `/genre/${typeProps}/${props.genre}/1`;   //links

    //change the title
    if (type) {
        let title = document.querySelector("title");
        title.innerText = titlePlaceholder;
    }

    //show the link explore if heading is hovered
    let [hovered, setHover] = useState("opacity-0 w-0");
    const itsHovered = () => {
        setHover("opacity-100 w-full");
    }

    //handle for changing page number
    const setPageNumber = (number) => {
        window.scrollTo(0, 0);
        if (data && type && genre) {
            navigate(`/genre/${typeProps}/${genre}/${number}`);
        } else {
            navigate(`/genre/${typeProps}/${number}`);
        }
    }

    if (loading) return <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
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

            {/* genres list */}
            {data && type &&
                <div className='mx-auto max-w-7xl p-6 lg:px-8 max-sm:px-2'>
                    <div id='filter-container'>
                        <div className='flex items-center justify-end'>
                            <button className='bg-blue-500 flex items-center p-1 gap-2 rounded-sm mb-3'>
                                <FaFilter className='w-3 h-3' />
                                Filter
                            </button>
                        </div>
                        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8'>
                            {genres.genres.map((item, index) => {
                                return (
                                    // <Link
                                    //     key={index}
                                    //     to={`/genre/${typeProps}/${item.id}/${item.name}/1`}
                                    //     className='hover:bg-gray-500 flex items-center justify-between p-2 rounded-md border border-gray-500'
                                    // >
                                    //     <p className='line-clamp-1'>{item.name}</p>
                                    //     <ChevronRightIcon className='w-5 h-5 max-sm:h-4 max-sm:w-4' />
                                    // </Link>
                                    <span key={index} className='flex items-center gap-2 border border-gray-500 p-2 rounded-md line-clamp-1'>
                                        <input
                                            type="checkbox"
                                            name={item.name}
                                            id={item.id}
                                            value={item.id}
                                            className='default:ring-2 checked:bg-red-200 '
                                            checked={checkboxes[item.id]}
                                            onChange={handleChangeCheckbox}
                                        />
                                        <label htmlFor={item.id}>
                                            <p className='line-clamp-1'>{item.name}</p>
                                        </label>
                                    </span>
                                )
                            })}
                        </div>
                        <div className='flex items-center justify-start mt-3'>
                            <button
                                className='bg-blue-500 flex items-center p-2 gap-1 rounded-full'
                                onClick={() => {
                                    if (combinedGenre) {
                                        navigate(`/genre/${typeProps}/${combinedGenre}/1`)
                                    }
                                }}
                            >
                                <IoIosSearch className='w-6 h-6' />
                                Filter
                            </button>
                        </div>
                    </div>
                    <br />
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
        </>
    )
}

export default Genre
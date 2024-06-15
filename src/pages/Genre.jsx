import React, { useState } from 'react'
import useFetch from '../components/useFetch';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Loading from '../components/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Pagination from '../components/Pagination';
import genres from '../genre.json';
import genresTv from '../genreTv.json'
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import mvimage from "../assets/nopic-movie.jpg";

const Genre = (props) => {
    const navigate = useNavigate();
    const { type, genre, pagenum } = useParams();    //parameters
    let typeProps = !props.type ? type : props.type;
    let genreProps = genre ? `&with_genres=${genre}` : !props.genre ? "" : `&with_genres=${props.genre}`;
    let pagenumProps = !pagenum ? "1" : pagenum;
    let genreNameProps = props.name;
    let titlePlaceholder = genre ? `Filter results | Genres` : "Genres";
    let [filterHeight, setFilterHeight] = useState("0px");
    let [hovered, setHover] = useState("opacity-0 w-0");
    let more = `/genre/${typeProps}/${props.genre}/1`;      //links
    let jsonGenre = type == "movie" ? genres : genresTv;    //change json name depending on type

    let [checkboxes, setCheckboxes] = useState(() => {
        const initialCheckboxes = {};
        genres.genres.map((item) => {
            initialCheckboxes[item.id] = genre == item.id ? true : false;
        });
        return initialCheckboxes;       //this is genre id object
    });

    //change the title
    if (type) {
        let title = document.querySelector("title");
        title.innerText = titlePlaceholder;
    }

    //radio button handle for changing type
    const handleChangeRadio = (event) => {
        let { value } = event.target;
        setCheckboxes(() => {
            const initialCheckboxes = {};
            genresTv.genres.map((item) => {
                initialCheckboxes[item.id] = false;
            });
            return initialCheckboxes;       //this is genre id object
        })
        navigate(`/genre/${value}/1`)
        setFilterHeight("0px");
    }

    //handle for checkboxes
    const handleChangeCheckbox = (event) => {
        const { id, checked } = event.target;

        //change state of checkbox
        setCheckboxes((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    }

    const genresChecked = Object.keys(checkboxes).filter((item) => checkboxes[item]);   //will filter all keys of "checkboxes" that is true/checked

    //will combine all genre id of checkboxes that are checked
    let combinedGenre = genresChecked.join(', ');

    //fetch
    let url = `https://api.themoviedb.org/3/discover/${typeProps}?include_adult=false${genreProps}&include_video=true&language=en-US&page=${pagenumProps}&sort_by=popularity.desc`;
    const { data, loading, error } = useFetch(url, "GET");

    //show the link explore if heading is hovered
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
                                    location = `/movies/movieinfo/${encodeURIComponent(movie.title)}/${movie.id}`;
                                    break;
                                case 'tv':
                                    img_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                                    location = `/tv/tvinfo/${encodeURIComponent(movie.name)}/${movie.id}`;
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
                    <div className='flex items-center justify-end'>
                        <button
                            className='bg-blue-500 flex items-center p-1 gap-2 rounded-sm mb-3'
                            onClick={() => {
                                let filterContainer = document.getElementById("filter-container");
                                filterHeight == "0px" ? setFilterHeight(`${filterContainer.scrollHeight}px`) : setFilterHeight("0px");
                            }}
                        >
                            <FaFilter className='w-3 h-3' />
                            Filter
                        </button>
                    </div>
                    <div id='filter-container'
                        className={`overflow-hidden shadow-md rounded-lg z-10 ${filterHeight == "0px" ? "mb-0" : "mb-3"}`}
                        style={{
                            backgroundColor: "#323232",
                            maxHeight: filterHeight,
                            transition: "all 1s cubic-bezier(0.5,-2,0,1)"
                        }}
                    >
                        <div id="type-container" className='p-2'>
                            <h1 className='text-lg'>Type</h1>
                            <div
                                className='flex items-center gap-2'
                            >
                                <div className='flex items-center gap-1'>
                                    <input type='radio'
                                        id="movieType"
                                        value="movie"
                                        name='typeOption'
                                        checked={type == "movie" ? true : false}
                                        onChange={handleChangeRadio}
                                    /><label htmlFor="movieType">Movie</label>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input type='radio'
                                        id="tvType"
                                        value="tv"
                                        name='typeOption'
                                        checked={type == "tv" ? true : false}
                                        onChange={handleChangeRadio}
                                    /><label htmlFor="tvType">TV</label>
                                </div>
                            </div>
                        </div>
                        <hr className='border border-gray-500 mx-2' />
                        <div id='genre-container' className='p-2'>
                            <h1 className='text-lg'>Genre</h1>
                            <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8'>
                                {jsonGenre.genres.map((item, index) => {
                                    return (
                                        <div key={index}
                                            className='flex items-center gap-2 border border-gray-500 p-2 rounded-md line-clamp-1'
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.name}
                                                id={item.id}
                                                value={item.id}
                                                className='default:ring-2 checked:bg-red-200 '
                                                checked={checkboxes[item.id]}
                                                onChange={handleChangeCheckbox}
                                            />
                                            <label htmlFor={item.id}
                                                title={item.name}
                                            >
                                                <p className='line-clamp-1'>{item.name}</p>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='flex items-center justify-start p-2'>
                            <button
                                className='bg-blue-500 flex items-center p-2 gap-1 rounded-full'
                                onClick={() => {
                                    if (combinedGenre) {
                                        navigate(`/genre/${typeProps}/${combinedGenre}/1`)
                                        setFilterHeight("0px");
                                    }
                                }}
                            >
                                <IoIosSearch className='w-6 h-6' />
                                Filter
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:gap-2 max-sm:grid-cols-2'>
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
                </div>
            }
        </>
    )
}

export default Genre
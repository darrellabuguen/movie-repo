import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [options, openOptions] = useState(false);

    const search = () => {
        const srch_val = document.querySelector('#srch').value;
        const encoded_srch_val = encodeURIComponent(srch_val);
        const movie_option = document.getElementById("movie_check");
        const tv_option = document.getElementById("tv_check");
        const people_option = document.getElementById("people_check");
        var movie = movie_option.checked ? "movie=true" : "movie=false";
        var tv = tv_option.checked ? "tv=true" : "tv=false";
        var people = people_option.checked ? "people=true" : "people=false";

        if (srch_val !== "") {
            navigate(`/result/${encoded_srch_val}/${movie}/${tv}/${people}/1`);
        }
    }

    return (
        <div
            className='flex items-center mx-2 lg:px-8 relative max-sm:static'
            style={{
                width: '30rem'
            }}
        >
            <input type="search"
                placeholder='Search'
                id='srch'
                required
                autoComplete='off'
                className='h-8 rounded-l-md px-2 w-full text-black'
                onFocus={() => {
                    var srch = document.getElementById("srch");
                    srch.style.outline = '#0F8BE6 2px solid';
                    openOptions(true);
                }}
                onBlur={() => {
                    var srch = document.getElementById("srch");
                    srch.style.outline = 'none';
                    openOptions(false);
                }}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        search();
                    }
                }}
            />

            <div className={`absolute top-0 opacity-0 justify-center bg-white shadow-lg ring-1 ring-gray-900/5 p-2 rounded-md z-10 max-sm:left-0 max-sm:w-full max-sm:top-12 delay-75 duration-100
            ${options ? 'translate-y-9 max-sm:translate-y-2 opacity-100 pointer-events-auto' : 'translate-y-0 opacity-0 pointer-events-none'}
            `}
                onFocus={() => {
                    openOptions(true);
                }}
                onBlur={() => {
                    openOptions(false);
                }}
            >
                <div className='w-full'>
                    <h1 className=' text-black font-medium'>Search for</h1>
                    <div className='flex gap-2 items-center px-1'>
                        <span className='flex items-center gap-1'>
                            <input id='movie_check' type="checkbox" name="movie_check" />
                            <label htmlFor="movie_check" className='text-black'>Movies</label>
                        </span>
                        <span className='flex items-center gap-1'>
                            <input id='tv_check' type="checkbox" name="tv_check" />
                            <label htmlFor="tv_check" className='text-black'>TV</label>
                        </span>
                        <span className='flex items-center gap-1'>
                            <input id='people_check' type="checkbox" name="people_check" />
                            <label htmlFor="people_check" className='text-black'>Celebrity</label>
                        </span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    search();
                }}
                className='h-8 bg-white rounded-r-md p-2 hover:bg-zinc-200 text-black flex items-center'
            ><IoSearchOutline className='w-6' /></button>
        </div>
    )
}

export default Search
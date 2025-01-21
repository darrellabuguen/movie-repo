import React, { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';
import Cast from './Cast';
import Overview from './Overview';
import Episodes from './Episodes';

const MtvInfo = (props) => {
    const id = props.id;
    const type = props.type;
    const seasons = props.seasons;
    const nav = ["Episodes", "Overview", "Cast"];
    let currentNav = type == "tv" ? "Episodes" : "Overview";
    const [active, setActive] = useState(nav.indexOf(`${currentNav}`));

    useEffect(() => {
        if (type == "movie") {
            let navs = document.querySelectorAll("li");
            navs.forEach(navi => {
                navi.textContent == "Episodes" ? navi.remove() : navi;
            })
        }
    });

    return (
        <>
            <div className='mb-3'>
                <ul style={{ backgroundColor: '#323232' }} className='flex align-center w-full p-1 rounded-md'>
                    {nav.map((item, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-1 w-full text-center rounded-md`}
                            style={{
                                backgroundColor: active === index ? ' #202020' : '',
                                color: active === index ? '#fff' : '#ccc'
                            }}
                            onClick={() => {
                                setActive(index);
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            {active == 0 && type == "tv" && (
                <Episodes id={id} seasons={seasons} />
            )}
            {active == 1 && (
                <Overview id={id} type={type} />
            )}
            {active == 2 && (
                <Cast id={id} type={type} />
            )}
        </>
    )
}

export default MtvInfo
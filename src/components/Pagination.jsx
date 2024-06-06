import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = (props) => {
    const page = props.page;
    const totalPages = props.total;
    const [nextBtn, setNextBtn] = useState("");
    const [prevBtn, setPrevBtn] = useState("");

    useEffect(() => {
        page == totalPages ? setNextBtn("pointer-events-none opacity-55") : setNextBtn("");
        page == 1 ? setPrevBtn("pointer-events-none opacity-55") : setPrevBtn("");
    });

    return (
        <div className='flex items-center justify-center gap-2 mt-4'>
            <button
                className={`text-white rounded-md cursor-pointer border-none p-2 flex items-center ${prevBtn}`}
                style={{
                    backgroundColor: '#323232',
                    color: '#fff'
                }}
                onClick={(e) => {
                    var page_number = document.querySelector(".page-number");
                    if (page_number.value > 1) {
                        let page = parseInt(page_number.value) - 1;
                        props.set(page);
                        page_number.value = page;
                        e.target.style.pointerEvents = "none";
                        setTimeout(() => {
                            e.target.style.pointerEvents = "all";
                        }, 1000);
                    }
                }}
            >
                <ChevronLeftIcon className='w-5 h-5' />Prev
            </button>
            <input
                type="number"
                style={{
                    backgroundColor: '#323232',
                    color: '#fff'
                }}
                defaultValue={page}
                min="1"
                max={totalPages}
                className='page-number'
                // onChange={(e) => {
                //     var value = e.target.value;
                //     if (value <= totalPages && value > 0) {
                //         props.set(value);
                //     }
                // }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        var value = e.target.value;
                        if (value <= totalPages && value > 0) {
                            props.set(value);
                        }
                    }
                }}
            />
            <button
                className={`text-white rounded-md cursor-pointer border-none p-2 flex items-center ${nextBtn}`}
                style={{
                    backgroundColor: '#323232',
                    color: '#fff'
                }}
                onClick={(e) => {
                    var page_number = document.querySelector(".page-number");
                    if (page_number.value < totalPages) {
                        let page = parseInt(page_number.value) + 1;
                        props.set(page);
                        page_number.value = page;
                        e.target.style.pointerEvents = "none";
                        setTimeout(() => {
                            e.target.style.pointerEvents = "all";
                        }, 1000);
                    }
                }}
            >
                Next<ChevronRightIcon className='w-5 h-5' />
            </button>
        </div>
    )
}

export default Pagination
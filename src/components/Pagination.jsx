import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = (props) => {
    const page = props.page;
    const totalPages = props.total;

    return (
        <div className='flex items-center justify-center gap-2 mt-4'>
            <button
                className='text-white rounded-md cursor-pointer border-none p-2 flex items-center'
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
                onChange={(e) => {
                    var value = e.target.value;
                    if (value <= totalPages && value > 0) {
                        props.set(value);
                    }
                }}
            />
            <button
                className='text-white rounded-md cursor-pointer border-none p-2 flex items-center'
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
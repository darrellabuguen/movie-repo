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
                onChange={(e) => {
                    var value = e.target.value;
                    if (value <= totalPages && value > 0) {
                        console.log(value);
                    }
                }}
            />
            <button
                className='text-white rounded-md cursor-pointer border-none p-2 flex items-center'
                style={{
                    backgroundColor: '#323232',
                    color: '#fff'
                }}
            >
                Next<ChevronRightIcon className='w-5 h-5' />
            </button>
        </div>
    )
}

export default Pagination
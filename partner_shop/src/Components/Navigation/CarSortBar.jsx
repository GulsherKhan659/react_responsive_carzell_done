import React from 'react';
import { CarSortSelect } from "./CarSortSelect";

export const CarSortBar = ({ fnSortChange }) => {
    return (
        <>
            <div className='grid grid-cols-3 my-2 items-center rounded-2xl  bg-slate-200 px-4   w-full border border-slate-300'>
                <div className='text-xs font-bold  border-r-[3px] mr-2  border-r-gray-100   '>SORT BY</div>
                <div className='col-span-2 '><CarSortSelect onChange={(value) => fnSortChange(value)} /></div>
            </div>
        </>
    )
}
import React from 'react';

export const TopMenuItem = ({ path, title, selected, number }) => {
    return (
        <>
            <a href={path} className={'flex items-center w-[50px] md:w-[80px] lg:w-[100px]  justify-center hover:bg-white hover:scale-105 hover:opacity-80 duration-300 px-2 py-1 ' + (selected === true ? ' font-bold py-1 md:py-2 lg:py-2 border-b-4 border-b-blue-500 mx-2' : 'border-b-2 border-b-slate-300 mx-2')} >
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-lg text-gray-700 uppercase text-center">{title}</span>
                <div className={' rounded-full w-[10px] h-[10px]  md:w-[20px] md:h-[20px] lg:w-[20px] lg:h-[20px] flex items-center justify-center text-xs text-white ' + (number === undefined ? 'hidden' : 'bg-blue-500')}>
                    {number}
                </div>
            </a>
        </>
    )
}

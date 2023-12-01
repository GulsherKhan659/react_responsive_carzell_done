import React from "react";

export const VATIcon = ({ vatStatusId }) => {
    return (
        <span className='text-xs  px-2 rounded-full mx-1 w-5 h-5 font-bold bg-slate-200'>{vatStatusId === 4 ? 'I' : 'E'}</span>
    )
}
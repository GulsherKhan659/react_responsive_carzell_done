import React from "react";
import { EnsureNoneBreakingSpace } from "../../Hooks/UseGenericFunctions";

export const CarAttribute = ({ label, value }) => {
    return (
        <>
            <div className='flex items-center'>
                <div className='text-[10px] sm:text-xs font-semibold mb-1 w-[80px] mr-2'>{EnsureNoneBreakingSpace(label)}</div>
                <div className='mb-1 text-[10px] sm:text-xs sm:text-xss'>{value}</div>
            </div>
        </>
    )
}
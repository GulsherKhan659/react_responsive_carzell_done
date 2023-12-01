import React from 'react';
import { getKeyAccountEmail, getKeyAccountName, getKeyAccountPhone, getKeyAccountProfileImageThumb } from "../../Hooks/UseBaseData";

export const CustomerManagerInformationBox = ({ title }) => {
    return (
        <>
            <div className='flex items-center justify-between bg-white p-4 w-full rounded-xl pr-4'>
                <div>
                    <div className='text font-semibold text-gray-700 mb-2 capitalize'>{title}</div>
                    <div className='text-xs sm:text-sm font-bold text-gray-500 mb-1'>{getKeyAccountName()}</div>
                    <div className='text-xs sm:text-sm text-gray-500 flex items-center'>
                        <span className="material-symbols-outlined mr-2 text-base">phone</span>{getKeyAccountPhone()}
                    </div>
                    <div className='text-xs sm:text-sm text-gray-500 flex items-center'>
                        <span className="material-symbols-outlined mr-2 text-base">mail</span><a href={'mailto:' + getKeyAccountEmail()}>{getKeyAccountEmail()}</a>
                    </div>
                </div>
                <div>
                    <img src={getKeyAccountProfileImageThumb()} className='w-[80px] h-[80px] rounded-full object-cover' alt={'employee ' + getKeyAccountName()} />
                </div>
            </div>
        </>
    )
}
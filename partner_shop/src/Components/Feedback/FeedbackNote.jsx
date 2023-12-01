import React from 'react';
import {Button, Textarea} from "@mantine/core";

export const FeedbackNote = ({title}) => {
    return (
        <>
            <div className='flex items-center justify-between bg-white p-4 w-full rounded-xl pr-4 relative'>
                <div className='absolute top-[20px] right-[20px] rounded-full bg-gray-100 flex items-center justify-center w-[40px] h-[40px] border border-gray-300'>
                    <span className="material-symbols-outlined text-gray-400">
                        flare
                    </span>
                </div>
                <div>
                    <div className='text font-semibold text-gray-700 mb-2 capitalize'>How can we improve?</div>
                    <div className='text-sm text-gray-500 mb-1'>Please let us know if you have any ideas<br /> for improvement</div>
                    <div className='mt-6'>
                        <div className='text-sm mb-2'>Describe your idea</div>
                        <Textarea
                            placeholder="I would really like that I could ..."
                            autosize
                            cols={50}
                        />
                    </div>
                    <div className='mt-4 flex items-center justify-center'>
                        <Button type="filled" fullWidth>Submit proposal</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
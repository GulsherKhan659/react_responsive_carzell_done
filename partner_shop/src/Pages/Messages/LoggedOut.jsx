import React from "react";

export const LoggedOut = () => {
    return (
        <>
            <div className="h-screen flex items-center justify-center pt-4 pl-6 pr-10">
                <div className='text-center mb-[200px] bg-white rounded-2xl p-16 shadow'>
                    <div className='flex justify-center'><img src="/images/logo.png" className="min-w-[272px] max-w-[272px]" alt='Carzelle logo'/></div>
                    <div className='text-gradient text-info login-header mb-1 mt-8'>You have been logged out</div>
                    <button className='blue-gradient-button w-full mt-16'><a href='/login' className='font-bold'>Click here to log back in</a></button>
                </div>
            </div>
        </>
    )
}
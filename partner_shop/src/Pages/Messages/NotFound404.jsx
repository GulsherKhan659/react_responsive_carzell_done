import React from "react";

export const NotFound404 = () => {
    return (
        <>
            <div className="h-screen flex items-center justify-center pt-4 pl-6 pr-10">
                <div className='text-center mb-[200px] bg-white rounded-2xl py-16 px-[250px] shadow'>
                    <div className='flex justify-center'><img src="/images/logo.png" className="min-w-[272px] max-w-[272px]" alt='Carzelle logo'/></div>
                    <div className='text-[80px] font-bold text-blue-700'>404</div>
                    <div className='text-gradient text-info login-header mb-1 mt-4'>Oops - the page you asked for<br /> is not here</div>
                    <button className='blue-gradient-button w-full mt-16 h-[50px]'><a href='/' className='font-bold'>Click here to log back in</a></button>
                </div>
            </div>
        </>
    )
}
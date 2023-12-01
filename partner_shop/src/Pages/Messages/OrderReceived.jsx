import React from "react";

export const OrderReceived = () => {

    return (
        <div className='w-full h-screen flex items-center justify-center pb-[200px]'>
            <div>
                <div className='w-full mt-[50px] block mb-8'><img src="/images/logo.png" className="m-auto min-w-[200px] max-w-[200px]" alt='Carzelle logo'/></div>
                <div className='w-[500px] px-[80px] py-[50px] login-header-background rounded-2xl shadow-xl'>
                    <div className='flex justify-center'>
                        <div className='p-4 rounded-lg'>
                            <span className="flex material-symbols-outlined text-white text-[80px]" title="Add this car to order list">
                                shopping_cart
                            </span>
                        </div>
                    </div>
                    <div className='text-3xl font-bold text-white text-center mt-8'>Thank you!</div>
                    <div className='text-xl font-light text-white text-center mt-4'>
                        We have received your order and you will receive an email with the order confirmation shortly.
                        <br /><br />
                        <a href='/' className='font-bold text-white underline underline-offset-4'>Click here to go back to the Car List</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
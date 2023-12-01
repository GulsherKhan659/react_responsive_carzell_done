import React, { useState } from 'react';
import { TopMenuItem } from '../Components/Navigation/TopMenuItem';
import { AvailableCars } from "./AvailableCars";
import { Checkout } from "./Checkout";
import { getUserCompanyName } from "../Hooks/UseBaseData";
import { axiosInstance } from "../Api/AxiosConfig";
import { getCookie } from "../Hooks/UseGenericFunctions";
import { ExplicitCssClasses } from "../Components/System/ExplicitCssClasses";
import { Terms } from "./Terms/Terms";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

export const Home = ({ menuItemSelected }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(menuItemSelected);
    const [updateData, setUpdateData] = useState(false);
    const [showPrice, setShowPrice] = useState(true);
    const employee_id = 2;

    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie('CARZELLE_API_TOKEN');

    return (

        <>
            <ExplicitCssClasses />
            {/* <div className="h-screen pt-4 pl-6 pr-10">
                <div className="flex-1 min-w-0 flex flex-col"> */}
            <div className='h-screen px-2 grid grid-cols-1'>

                <div className='w-full grid  grid-cols-5' >
                    <div className='flex items-center col-span-2'>
                        <div className='mr-3 ml-3'><img src="/images/logo.png" className="w-[50px] sm:w-[102px] md:w-[132px] lg:w-[172px] " alt='Carzelle logo' /></div>
                        <div className='text-xs sm:text-[12px] md:text-xl lg:text-2xl font-light text-black border-l-2 border-l-black pl-4'>{getUserCompanyName()}</div>
                    </div>

                    {/* /// */}

                    <div className="flex items-center justify-end col-span-3">
                        <TopMenuItem path="/" onSelect={() => setSelectedMenuItem(1)} title="Casrlist" selected={selectedMenuItem === 1} iconFileName="shopping_cart" />
                        <TopMenuItem path="/checkout" onSelect={() => setSelectedMenuItem(2)} title="Checkout" selected={selectedMenuItem === 2} iconFileName="truck" />
                        <TopMenuItem path="/terms" onSelect={() => setSelectedMenuItem(5)} title="Terms" selected={selectedMenuItem === 5} iconFileName="shield" />
                        <div className='md:w-[20px] w-[25px]  text-gray-600' onClick={() => setShowPrice(!showPrice)}>
                            <CurrencyDollarIcon />
                        </div>
                    </div>

                </div>

                <div className="w-full transition-all duration-200 ease-soft-in-out  rounded-xl">
                    <div style={{ display: selectedMenuItem === 1 ? 'block' : 'none' }}><AvailableCars fnUpdate={() => setUpdateData(!updateData)} employeeId={employee_id} showPrice={showPrice} /></div>
                    <div style={{ display: selectedMenuItem === 2 ? 'block' : 'none' }}><Checkout employeeId={employee_id} /></div>
                    <div style={{ display: selectedMenuItem === 5 ? 'block' : 'none' }}><Terms /></div>
                </div>

            </div>
            {/* </div>
            </div> */}
        </>
    )

}
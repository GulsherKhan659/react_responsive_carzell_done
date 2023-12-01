import React, { useEffect, useState } from 'react';
import { Switch, TextInput } from '@mantine/core';
import { CarBrandSelect } from "./CarBrandSelect";

export const CarFilterBar = ({ fnFilterChange, makes }) => {
    const [controlValueData, setControlValueData] = useState(InitControlValueData);

    const changeFilterValue = (value, elementName) => {
        setControlValueData(prevState => ({
            ...prevState, [elementName]: value
        }));
    }

    useEffect(() => {
        fnFilterChange(controlValueData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlValueData]);

    return (
        <>


            <div className=' grid grid-cols-1 sm:grid-cols-3  rounded-2xl my-2   px-1 bg-slate-200  w-full     border border-slate-300 '>
                <div className='grid grid-cols-4 sm:grid-cols-5'>
                    <div className='text-xs font-bold   justify-center   border-r-[3px] border-r-gray-100 h-full text-center py-1  sm:py-2 '>FILTER</div>
                    <div className='text-[10px] sm:text-xs  col-span-2  border-r  px-1 sm:px-2  border-r-white h-full '><TextInput placeholder='Search text' className=' w-full' onChange={(event) => changeFilterValue(event.currentTarget.value, 'search_text')} /></div>

                    <div className='text-[10px] sm:text-xs  border-r col-span-1 sm:col-span-2 text-center px-1 py-0 sm:px-1 sm:py-0 w-full border-r-white h-full  '><Switch checked={controlValueData.hide_sold} labelPosition='left' label='Hide sold' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'hide_sold')} className='' color='blue' classNames={{

                        label: 'text-[10px] sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white'
                    }} /></div>


                </div>

                <div className='col-span-2 grid grid-cols-10 mt-2 sm:mt-0'>
                    <div className='text-[10px] sm:text-xs    col-span-3    border-r px-1 py-0 sm:px-2 sm:py-0 border-r-white h-full flex justify-center '><Switch checked={controlValueData.in_basket} labelPosition='left' label='Order items' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'in_basket')} className='   ' classNames={{ label: 'text-[10px] sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white' }} /></div>


                    <div className='text-[10px] sm:text-xs  col-span-3  border-r px-1 py-0 sm:px-2 sm:py-0 border-r-white h-full  flex justify-center'><Switch checked={controlValueData.buy_status} labelPosition='left' label='Fast Delivery' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'buy_status')} className='  ' classNames={{ label: 'text-[10px] sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white' }} /></div>
                    <div className='col-span-4 px-1 sm:px-2'><CarBrandSelect value={controlValueData.make_id} makes={makes} onChange={(value) => changeFilterValue(value, 'make_id')} /></div>


                </div>

            </div>
            {/* <div className='grid grid-cols-12   rounded-2xl my-2  bg-slate-200  w-full   h-[40px]  border border-slate-300'>
                <div className='text-[10px] sm:text-xs font-bold  hidden sm:block  border-r-[3px] border-r-gray-100 h-full text-center py-1  sm:py-2 '>FILTER</div>
                <div className='text-[10px] sm:text-xs col-span-3 md:col-span-3    border-r  px-1 sm:px-2  border-r-white h-full '><TextInput placeholder='Search text' className=' w-full' onChange={(event) => changeFilterValue(event.currentTarget.value, 'search_text')} /></div>

                <div className='text-[10px] sm:text-xs col-span-2     border-r text-center px-1 py-0 sm:px-4 sm:py-2 border-r-white h-full  '><Switch checked={controlValueData.hide_sold} labelPosition='left' label='Hide-sold' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'hide_sold')} className='w-[15px]' color='blue' classNames={{

                    label: 'sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white'
                }} />
                </div>
                <div className='text-[10px] sm:text-xs  col-span-2    border-r px-1 py-0 sm:px-4 sm:py-2 border-r-white h-full  '><Switch checked={controlValueData.in_basket} labelPosition='left' label='Order-items' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'in_basket')} className='   ' classNames={{ label: 'text-[8px] sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white' }} /></div>
                
                    
                <div className='text-[10px] sm:text-xs  col-span-3 sm:col-span-2   border-r px-0 py-0 sm:px-3 sm:py-2 border-r-white h-full  '><Switch checked={controlValueData.buy_status} labelPosition='left' label='Fast-Delivery' onChange={(event) => changeFilterValue(event.currentTarget.checked, 'buy_status')} className='  ' classNames={{ label: 'text-[8px] sm:text-xs', thumb: 'bg-blue-500', track: 'bg-white' }} /></div>
                <div className='col-span-2 px-1 sm:px-2'><CarBrandSelect value={controlValueData.make_id} makes={makes} onChange={(value) => changeFilterValue(value, 'make_id')} /></div>
            
            </div> */}
        </>
    )
}

export const InitControlValueData = () => {
    return {
        search_text: '',
        hide_sold: false,
        in_basket: false,
        make_id: null
    }
}
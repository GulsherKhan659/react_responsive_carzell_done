import { formatNumberWithSeparator } from "../../Hooks/UseGenericFunctions";
import React from "react";

export const CheckoutLines = ({ lines, title }) => {

    if (lines.length !== 0) {

        return (
            <>
                <div className='text-xs md:text-sm font-bold text-gray-800 mt-4'>{title}</div>

                <div className='flex mt-4 items-center justify-between text-sm uppercase text-gray-500 font-extrabold border-b border-gray-200 pb-2'>
                    <div className='w-full grid text-center grid-cols-9 gap-1 md:grid-cols-9 md:gap-1'>
                        <div className="col-span-3">
                            VIN
                        </div>
                        <div className="col-span-2" >
                            Item
                        </div>
                        <div >
                            Km
                        </div>
                        <div >
                            VAT
                        </div>
                        <div className="col-span-2">
                            PRICE
                        </div>
                    </div>

                </div>

                {lines.map((item) => (
                    <div key={'item_' + item.basketHash}>
                        <div className={'flex mt-4 text-sm items-center justify-between relative ' + (item.is_sold === 1 ? ' line-through' : '')}>
                            <div className={'absolute top-0 right-0 flex justify-center bg-gray-200 w-[140px] px-2 rounded bg-red-700 text-white ' + (item.is_sold === 1 ? '' : 'hidden')}>Sold</div>
                            <div className='flex'>
                                <div className='w-full grid text-center grid-cols-9 gap-1 sm:grid-cols-9 sm:gap-1 text-xs md:text-sm'>

                                    <div className='text-[9px] sm:text-sm col-span-3'>
                                        {item.cars_vin_no}
                                    </div>
                                    <div className='text-[9px] sm:text-sm col-span-2'>
                                        {item.cars_designation}
                                    </div>
                                    <div className='text-[9px] sm:text-sm '>
                                        {item.cars_km === null ? '' : formatNumberWithSeparator(item.cars_km, '.')}
                                    </div>
                                    <div className='text-[9px] sm:text-sm '>
                                        {item.cars_vat_status === 4 ? 'VAT\u00A0Incl.' : 'Ex.\u00A0VAT'}
                                    </div>
                                    <div className='text-[9px] sm:text-sm col-span-2'>
                                        {formatNumberWithSeparator(parseInt(item.price), '.')}&nbsp;{item.currency}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </>
        )
    } else {
        return null;
    }
}
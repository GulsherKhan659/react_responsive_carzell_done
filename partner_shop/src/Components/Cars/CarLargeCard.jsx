import React from "react";
import {formatNumberWithSeparator} from "../../Hooks/UseGenericFunctions";
import {AddToBasketButton} from "../ShoppingBasket/AddToBasketButton";

export const CarLargeCard = ({car, show, fnUpdate}) => {
    return (
        <div key={'carLargeCard_' + car.id} title='Click to see all details' className={"ml-10 mb-3 rounded-lg bg-white min-h-[100px] w-[700px] px-8 pt-10 pb-8 relative hover:scale-[1.02] duration-300 flex-none justify-left cursor-pointer " + (car.basket_items.length > 0 ? 'border-[2px] border-purchase-color' : '')} style={{display: show ? 'block' : 'none'}}>
            <div className="flex justify-between">
                <div className="mr-8 text-[20px] font-medium">
                    {car.registration_year}&nbsp;{car.model}
                </div>
                <div className="text-xl">
                    {formatNumberWithSeparator(car.expected_sales_price, '.')}&nbsp;€
                </div>
            </div>
            <div className="mr-3 font-light text-slate-700">
                {car.description}
            </div>
            <div className="mr-3 font-light text-slate-700">
                {formatNumberWithSeparator(car.km, '.')}&nbsp;
                km on the clock
            </div>
            <div className="{ car.stock === 1 ? '' : 'hidden' }">
                <span>In stock</span>
            </div>
            <div className="mt-8  { car.image_file === '' ? 'hidden' : '' }">
                <img className="w-[300px]" src={"/cars/" + car.image_file + ".png"} alt={'image for ' + car.brand.name + ' ' + car.model} />
            </div>
            <div className={ (car.stock === 1 ? '' : 'hidden') + ' py-1 px-2 absolute left-8 top-3 text-white text-center text-xs rounded bg-blue-500'}>
                <span>Fast delivery</span>
            </div>
            <div className={ (car.stock === 0 ? '' : 'hidden') + ' py-1 px-2 absolute left-8 top-3 text-white text-center text-xs rounded bg-gray-500'}>
                <span>Available for purchase</span>
            </div>
            <div className='absolute right-5 bottom-3'>
                <AddToBasketButton id={car.id} fnUpdate={fnUpdate}/>
            </div>
        </div>
    )
}
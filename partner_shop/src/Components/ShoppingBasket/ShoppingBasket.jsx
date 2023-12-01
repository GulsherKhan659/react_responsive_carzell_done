import { useEffect, useState } from "react";
import { formatNumberWithSeparator } from "../../Hooks/UseGenericFunctions";
import { axiosInstance } from "../../Api/AxiosConfig";
import { Tooltip } from "@mantine/core";

export const ShoppingBasket = ({ showPrice, updateBasket, fnUpdate }) => {
    const [data, setData] = useState();
    const [updateBasketInternal, setUpdateBasketInternal] = useState(false);

    useEffect(() => {
        axiosInstance
            .get("shop/get-basket")

            .then((response) => {
                setData(response.data.basket);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [updateBasketInternal, updateBasket]);

    const deleteItem = (hash) => {
        axiosInstance
            .delete("shop/remove-from-basket/" + hash)

            .then(() => {
                setUpdateBasketInternal(!updateBasketInternal);
                fnUpdate();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    if (data) {
        return (
            <>
                <div className="bg-white p-2 sm:p-8 w-full rounded border-t-[5px] border-t-purchase-color ">
                    <div className='flex items-center justify-between'>
                        <div className='text-2xl font-semibold text-gray-700'>Cars to Order</div>
                        <div className='text-white font-extrabold bg-purchase-color rounded-full p-1 sm:p-4 w-[20px] h-[20px] flex items-center justify-center'>{data.length}</div>
                    </div>
                    <hr className='mt-1 sm:mt-2' />
                    <div className='mt-2 sm:mt-6'>
                        {data.map((basketItem) => (
                            <div key={'basket_item_' + basketItem.basketHash} className={'mb-4 relative ' + (basketItem.is_sold === 1 ? 'line-through' : '')}>
                                <Tooltip label='This car has been sold to another partner. Please remove it before proceeding' withArrow={true} openDelay={200} transition='pop'>
                                    <div className={'absolute top-0 right-[10px] flex justify-center bg-gray-200 w-[120px] px-2 rounded  text-white ' + (basketItem.is_sold === 1 ? '' : 'hidden')}>Sold</div>
                                </Tooltip>
                                <div className='flex mt-2 justify-between'>
                                    <div>
                                        {basketItem.cars_designation}
                                    </div>
                                    <div className='flex'>
                                        <div className='mr-2' style={{ display: showPrice ? 'block' : 'none' }}>
                                            {formatNumberWithSeparator(parseFloat(basketItem.price), '.')}&nbsp;{basketItem.currency}
                                        </div>
                                        <div>
                                            <Tooltip label='Remove from basket' withArrow={true} openDelay={1500} transition='pop'>
                                                <button className='rounded-full w-[10px] h-[10px]' onClick={() => deleteItem(basketItem.basketHash)}>
                                                    <span className="material-symbols-outlined text-slate-500 text-base">
                                                        cancel
                                                    </span>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center  justify-center '>
                        <a href='/checkout' className=''>
                            <div className="bg-red w-full">
                                <button className={' rounded text-white font-semibold px-4 py-2 mt-4 sm:mt-8 mb-3 sm:mb-6 ' + (data.length === 0 ? ' bg-gray-300 text-black' : 'bg-purchase-color hover:scale-[1.05] duration-300')}>{data.length === 0 ? 'Add items to place order' : 'Go to Checkout ...'}</button>
                            </div>
                        </a>
                    </div>
                    <div className='text-slate-400 text-sm'>Please note, that we cannot reserve the cars before you have clicked on "Go to checkout".</div>
                </div>
            </>
        )
    }
}
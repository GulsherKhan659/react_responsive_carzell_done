import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumberWithSeparator, getFormattedDate } from "../Hooks/UseGenericFunctions";
import { OrderField } from "../Components/Order/OrderField";
import { OrderTimeLine } from "../Components/Order/OrderTimeline";
import { CustomerManagerInformationBox } from "../Components/Information/CustomerManagerInformationBox";
import { axiosInstance } from "../Api/AxiosConfig";
import { CheckoutLines } from "../Components/Checkout/CheckoutLines";
import { CarStatusPill } from "../Components/Cars/CarStatusPill";

export const Checkout = () => {
    const [basket, setBasket] = useState();
    const [companyData, setCompanyData] = useState();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("shop/checkout")

            .then((response) => {
                setBasket(response.data.basket);
                setCompanyData(response.data.company)
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const PlaceOrder = () => {
        axiosInstance
            .post("shop/do-checkout")

            .then((response) => {
                if (response.status === 200) {
                    navigate("/orderreceived");
                }
            })

            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const CalculateTotal = () => {
        let total = 0;
        // eslint-disable-next-line array-callback-return
        basket.map((item) => {
            total += parseInt(item.price);
        });

        return total;
    }

    const DoesBasketContainSoldCars = (basketData) => {
        let sold_items = basketData.filter((item) => {
            return item.is_sold === 1;
        });

        return sold_items.length === 0 ? false : true;
    }

    if (basket && basket.length > 0) {

        return (
            <>
                <div className="w-full h-[80vh] overflow-auto grid grid-cols-1">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center sm:mt-6 lg:mt-8 md:mt-8 mt-4">
                            <div className="pr-4  text-sm md:text-2xl  lg:text-3xl font-bold">
                                Checkout
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-2">
                        <div className='mx-1  my-2'>
                            {/* CUSTOMER MANAGER INFORMATION */}
                            <div className=''>
                                <CustomerManagerInformationBox title="Any Questions?" />
                            </div>
                        </div>


                        <div className='mx-1  my-2 '>
                            {/* ORDER DETAILS */}
                            <div className=' relativev w-[100%]'>
                                {DoesBasketContainSoldCars(basket) &&
                                    <div className='text-red-500 absolute top-[-50px] font-bold left-0 z-10 w-full flex justify-center'>One or more of the cars you have added to your basket have been sold. Please remove them and try again</div>
                                }
                                {DoesBasketContainSoldCars(basket) === false &&
                                    <div className=' flex justify-normal md:justify-end  right-0 z-10'>
                                        <button className='rounded shadow-lg text-white font-semibold px-4 py-2 right-2 md:mr-1 md:mt-6 mt-0 mb-6  bg-purchase-color hover:scale-[1.05] duration-300' onClick={PlaceOrder}>Click here to place order</button>
                                    </div>
                                }
                                <div className='rounded-xl p-4 sm:p-8 bg-white relative'>
                                    <div className='  text-sm md:text-2xl font-semibold text-gray-700'>ORDER</div>
                                    <div className=' mt-12  md:mt-0 justify-center flex'><img src="/images/logo.png" className="w-[95px] max-w-[95px] md:w-[192px] md:max-w-[192px]" alt='Carzelle logo' /></div>

                                    <div className='mt-8 flex justify-between'>

                                        <div>

                                            <OrderField id='customer_name' label='Customer' text={companyData.name} textClass='font-bold text-xs md:text-sm' />
                                            <div className="text-xs md:text-sm">{companyData.address}</div>
                                            <div className="text-xs md:text-sm">{companyData.zip_code}&nbsp;{companyData.city}</div>
                                            <div className="text-xs md:text-sm">{companyData.country}</div>
                                            <div className="text-xs md:text-sm">Att. {userData.name}</div>
                                            <div className='mt-4'>
                                                <OrderField id='order_date' label='Order date' text={getFormattedDate(new Date(), '.')} />
                                            </div>
                                        </div>
                                        <div className='mr-6'>
                                            <div className='font-bold text-xs md:text-sm'>CARZELLE A/S</div>
                                            <div className="text-xs md:text-sm">Bakketoften 3</div>
                                            <div className="text-xs md:text-sm">8541 Skødstrup</div>
                                            <div className="text-xs md:text-sm">DK-Denmark</div>
                                            <div className='flex mt-3 items-center justify-between text-xs md:text-sm'>
                                                <div className='mr-2 text-gray-600 '>Phone:</div>
                                                <div className=''>+45 7241 0000</div>
                                            </div>
                                            <div className='flex items-center justify-between text-xs md:text-sm'>
                                                <div className='mr-2 text-gray-600 '>Email:</div>
                                                <div className=''>info@carzelle.com</div>
                                            </div>
                                            <div className='flex items-center justify-between text-xs md:text-sm'>
                                                <div className='mr-2 text-gray-600 '>CVR:</div>
                                                <div className=''>DK44210223</div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='mt-8' />

                                    <div className='mt-8 '>
                                        <CheckoutLines lines={basket.filter(item => item.buy_status === 'confirmed')} title={<CarStatusPill title='For Immediate Delivery' bgColor='bg-fast-delivery' className='text-xs md:text-sm' />} />
                                        <div className='mt-8'></div>
                                        <CheckoutLines lines={basket.filter(item => item.buy_status === 'listing')} title={<CarStatusPill title='Cars Reserved' bgColor='bg-reservable' className='text-xs md:text-sm' />} />
                                    </div>

                                    <div className='mt-8'>
                                        <div className='flex justify-between w-full bg-gray-200 rounded py-2 px-4'>
                                            <div className='text-xs md:text-sm'>
                                                Total
                                            </div>
                                            <div className="text-xs md:text-sm">
                                                {formatNumberWithSeparator(CalculateTotal(), '.')}&nbsp;{basket.length === 0 ? '' : basket[0].currency}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-[50px]'>
                                        <div className='text-xl mb-4 capitalize'>Delivery overview</div>
                                        <div className='text-sm text-gray-600 mb-8 leading-7'>
                                            <b>Please note</b>: We will start the process of shipping cars for <CarStatusPill title='Fast delivery' bgColor='bg-fast-delivery' className='text-xs' /> at once. <br />
                                            For <CarStatusPill title='Reservable' bgColor='bg-reservable' className='text-xs' /> cars, we will start the process of shipping as soon as we have confirmed the availability.
                                        </div>
                                        <OrderTimeLine />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </>
        )
    }

    if (basket && basket.length === 0) {
        return (
            <div className='w-full h-screen flex items-center justify-center overflow-auto'>
                <div className='w-[500px] px-[80px] py-[50px] login-header-background rounded-2xl shadow-xl'>
                    <div className='flex justify-center'>
                        <div className='p-4 rounded-lg'>
                            <span className="flex material-symbols-outlined text-white text-[80px]" title="Add this car to order list">
                                shopping_cart
                            </span>
                        </div>
                    </div>
                    <div className='text-3xl font-bold text-white text-center mt-8'>No items in basket</div>
                    <div className='text-xl font-light text-white text-center mt-4'>
                        Click <a href='/' className='font-bold text-white underline underline-offset-4'>here</a> to go to the Car List
                        and choose the cars you want by
                        adding them to the basket by
                        clicking the yellow Basket Button
                    </div>
                </div>
            </div>
        )
    }
}
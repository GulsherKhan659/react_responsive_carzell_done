import React, { useEffect, useState } from "react";
import { formatNumberWithSeparator } from "../../Hooks/UseGenericFunctions";
import { AddToBasketButton } from "../ShoppingBasket/AddToBasketButton";
import { Tooltip } from "@mantine/core";
import { axiosInstance } from "../../Api/AxiosConfig";
import { CarAttribute } from "./CarAttribute";
import { CarImageModal } from "./CarImageModal";
import { CarNavigationThumbs } from "./CarNavigationThumbs";
import { CarStatusPill } from "./CarStatusPill";
import { VATIcon } from "./VATIcon";

export const CarListRow = ({ car, showPrice, selectedCarId, setSelectedCarId, fnUpdate }) => {
    const [expandedView, setExpandedView] = useState(false);
    const [data, setData] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showImageIndex, setShowImageIndex] = useState(0);

    useEffect(() => {
        if (expandedView) {
            axiosInstance
                .get(car.info_endpoint)

                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expandedView]);

    useEffect(() => {
        if (car.hash !== selectedCarId) {
            setExpandedView(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCarId]);

    const handleThumbnailClick = (index) => {
        setShowImageIndex(index);
        setShowImageModal(true);
    }

    return (
        <Tooltip label='Click to see or hide all details' withArrow={true} openDelay={1500} transition='pop'>
            <div
                key={'carListRow_' + car.hash}
                onClick={() => {
                    setExpandedView(!expandedView);
                    setSelectedCarId(car.hash)
                }}
                className={"max-w-full mb-2 sm:mb-3 mx-1 rounded-lg flex items-center bg-white  relative cursor-pointer grow-div hover:shadow-lg " + (car.in_basket ? 'border-[1px] sm:border-[2px] border-purchase-color ' : ' border border-slate-200 border-solid block ') + (expandedView ? '' : ' min-h-[60px] ')}
                style={{ display: 'block' }} >
                <div className={'absolute top-0 left-0 flex rounded-lg items-center justify-center bg-white opacity-80 w-full h-full ' + (car.is_sold === 1 ? ' block ' : ' hidden ')}>
                    <span className='text-3xl font-bold'>SOLD</span>
                    <span className="material-symbols-outlined text-[40px] ml-4">eco</span>
                </div>

                <div className="grid grid-cols-7 sm:grid-cols-9  max-w-full ">  {/* /// PARENT DIV */}
                    <div className="col-span-1">
                        <img className='w-[60px] h-full object-scale-down' src={car.list_image} alt={'image for ' + car.designation} />
                    </div>


                    <div className="col-span-6 grid  sm:grid-cols-9 my-1 sm:my-4">   {/* /// CHILD 1 DIV */}


                        <div className="col-span-3 text-sm  w-full text-ellipsis truncate">
                            {car.designation}

                        </div>
                        <div className="col-span-5 font-light w-full text-slate-700 text-sm text-ellipsis truncate">
                            {/*  */}
                            <div className="hidden sm:block">{car.info_line_1}</div>
                            <div className=" sm:hidden grid grid-cols-6">
                                <div className="col-span-4">
                                    {car.info_line_1_mobile}

                                </div>
                                <div className="col-span-2 flex justify-end px-2"><VATIcon vatStatusId={car.vat_status_id} /></div>

                                <div className="col-span-6 flex justify-end px-2 text-xs font-bold"> {formatNumberWithSeparator(parseInt(car.price), '.')}&nbsp;{car.currency}</div>

                                <div className="col-span-6 flex justify-end px-2">
                                    <AddToBasketButton hash={car.hash} fnUpdate={fnUpdate} /></div>
                            </div>


                        </div>
                        <div className="hidden sm:block col-span-1 text-sm font-light text-slate-700 ">
                            {car.km === null ? '-' : formatNumberWithSeparator(car.km, '.')} km
                        </div>



                    </div>

                    <div className="hidden col-span-2 sm:grid grid-cols-5 my-1 sm:my-4">

                        <div className="col-span-2">
                            <AddToBasketButton hash={car.hash} fnUpdate={fnUpdate} />

                        </div>
                        <div className="col-span-2 text-xs font-bold">{formatNumberWithSeparator(parseInt(car.price), '.')}&nbsp;{car.currency}</div>
                        <div className="col-span-1"><VATIcon vatStatusId={car.vat_status_id} /></div>

                    </div>


                    {/* ///// */}
                </div>
                <div className={(car.buy_status === 'confirmed' && !car.is_sold ? '' : 'hidden') + ' z-10 absolute right-0 top-[-14px]'}>
                    <CarStatusPill title='Fast delivery' bgColor='bg-fast-delivery' className='text-[8px] sm:text-xs' />
                </div>
                <div className={(car.buy_status === 'listing' && !car.is_sold ? '' : 'hidden') + ' z-10 absolute right-0 top-[-14px]'}>
                    <CarStatusPill title='Reservable' bgColor='bg-reservable' className='text-[8px] sm:text-xs' />
                </div>
                <div className={(car.is_sold ? '' : 'hidden') + ' z-10 py-1 px-2 absolute left-[-10px] top-[-14px] text-white text-center text-[8px] sm:text-xs rounded bg-red-500 w-[90px]'}>
                    <span>Sold</span>
                </div>

                {/* EXPANDED VIEW */}
                {data.length !== 0 && expandedView &&
                    <div className={`border-t border-t-gray-200`}>
                        <div className='flex mt-4 ml-6'>
                            <div className=''>
                                <div className='grid grid-cols-2 sm:grid-cols-3'>
                                    <div className=''>
                                        <CarAttribute label='VIN' value={data.cars.vin_no.value} />
                                        <CarAttribute label='Make' value={data.cars.make_name.value} />
                                        <CarAttribute label='Model' value={data.cars.model.value} />
                                        <CarAttribute label='Model year' value={data.cars.model_year.value} />
                                        <CarAttribute label='First reg.' value={data.cars.reg_date.value} />
                                    </div>
                                    <div className=''>
                                        <div className='border-r border-l-solid w-[1px]'></div>

                                        <CarAttribute label='KM' value={data.cars.km.value} />
                                        <CarAttribute label='Color' value={data.cars.color.value === null ? data.cars.factory_color.value : data.cars.color.value} />
                                        <CarAttribute label='Car type' value={data.cars.car_type_name.value} />
                                        <CarAttribute label='Body type' value={data.cars.body_type_name.value} />
                                        <CarAttribute label='Seats' value={data.cars.seats.value} />
                                    </div>
                                    <div className=' my-2 sm:my-0'>
                                        <div className='border-r border-l-solid w-[1px]'></div>

                                        <CarAttribute label='Fuel' value={data.cars.fuel_name.value} />
                                        <CarAttribute label='CO2 rating' value={data.cars.co2_rating_wltp.value} />
                                        <CarAttribute label='Gear' value={data.cars.gear_name.value} />
                                        {data.cars.battery_size.value !== null && <CarAttribute label='Battery size' value={data.cars.battery_size.value} />}
                                        {data.cars.fuel_name.value !== 'Electric' && <CarAttribute label='Engine size' value={data.cars.engine_size.value} />}
                                        <CarAttribute label='HP' value={data.cars.horsepower.value} />
                                    </div>
                                </div>

                                {data.cars.condition.value !== null &&
                                    <div className='mt-5'>
                                        <div className='text-base font-semibold mb-3'>Condition</div>
                                        <div className='max-w-[750px] whitespace-normal'>
                                            {data.cars.condition.value}
                                        </div>
                                    </div>
                                }

                                {data.equipment.length > 0 &&
                                    <div className='mt-5'>
                                        <div className='text-base font-semibold mb-3'>Equipment</div>
                                        <div className='whitespace-normal'>
                                            {data.equipment.map((item) => (
                                                <span key={item.name} className='mb-[10px] whitespace-nowrap mr-2 px-2 py-1 rounded bg-gray-200 inline-block text-sm' style={{ lineHeight: '15px' }}>{item.name}</span>

                                            ))}
                                        </div>
                                    </div>
                                }

                                <div className='w-full items-center my-4'>
                                    <CarImageModal images={data.images.all} visible={showImageModal} setVisible={setShowImageModal} imageIndex={showImageIndex} />
                                    <CarNavigationThumbs images={data.images.all} maxImagesNumber={20} onClick={handleThumbnailClick} />
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </div>
        </Tooltip>
    )
}
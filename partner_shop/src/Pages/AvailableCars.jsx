import React, { useEffect, useState } from "react";
import { getCookie } from "../Hooks/UseGenericFunctions";
import { CarListRow } from "../Components/Cars/CarListRow";
import { ShoppingBasket } from "../Components/ShoppingBasket/ShoppingBasket";
import { CustomerManagerInformationBox } from "../Components/Information/CustomerManagerInformationBox";
import { CarFilterBar, InitControlValueData } from "../Components/Navigation/CarFilterBar";
import { CarSortBar } from "../Components/Navigation/CarSortBar";
import { axiosInstance } from "../Api/AxiosConfig";
import { Loader } from '@mantine/core';
import { DownloadCarListInExcelFormat } from "../Components/Excel/DownloadCarListInExcelFormat";
import { VATIcon } from "../Components/Cars/VATIcon";

export const AvailableCars = ({ fnUpdate, employeeId, showPrice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        axiosInstance
            .get("shop/get-basket")

            .then((response) => {
                setCartLength(response.data.basket.length);



            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });


    const [data, setData] = useState();
    const [makes, setMakes] = useState();
    const [updateData, setUpdateData] = useState(false);
    const [sortByField, setSortByField] = useState('brands.name');
    const [filterData, setFilterData] = useState(InitControlValueData);
    const [selectedCarId, setSelectedCarId] = useState(null);

    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie('CARZELLE_API_TOKEN');

    useEffect(() => {
        axiosInstance
            .get('/shop/buy-list')

            .then((response) => {
                setMakes(response.data.makes);
                setData(response.data.list);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [updateData]);

    const filterList = (data) => {
        let dataToFilter = data;

        if (filterData.make_id !== null) {
            dataToFilter = data.filter((car) => car.make_id.toString() === filterData.make_id);
        }

        if (filterData.in_basket) {
            dataToFilter = dataToFilter.filter((car) => car.in_basket !== null);
        }

        if (filterData.search_text !== '') {
            dataToFilter = dataToFilter.filter((car) => car.designation.toLowerCase().includes(filterData.search_text.toLowerCase()));
        }

        if (filterData.hide_sold) {
            dataToFilter = dataToFilter.filter((car) => car.is_sold === null);
        }

        if (filterData.buy_status) {
            dataToFilter = dataToFilter.filter((car) => car.buy_status === 'confirmed' && car.is_sold === null);
        }

        if (sortByField !== 'price') {
            // eslint-disable-next-line array-callback-return
            dataToFilter = dataToFilter.sort((a, b) => {
                if (a[sortByField] < b[sortByField]) {
                    return -1;
                }
            });
        } else {
            // eslint-disable-next-line array-callback-return
            dataToFilter = dataToFilter.sort((a, b) => {
                if (parseInt(a.price) < parseInt(b.price)) {
                    return -1;
                }
            });
        }

        return dataToFilter;
    }

    if (data) {
        return (
            <div id='container_2' className="grid grid-cols-1  my-2">
                <div className='grid grid-cols-1 sm:grid-cols-9 mb-[10px] md:mb-[30px]'>
                    <h2 className="text-xs my-2 md:text-xl font-semibold text-gray-900 leading-tight">Inventory</h2>
                    <div className="col-span-1 sm:col-span-6">
                        <CarFilterBar makes={makes} fnFilterChange={(filterValues) => setFilterData(filterValues)} />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <CarSortBar fnSortChange={(value) => setSortByField(value)} />
                    </div>
                </div>
                <div className="h-max grid grid-cols-1 sm:grid-cols-3 overflow-y-auto max-h-[50%] py-3">
                    <div className='sm:col-span-2'>
                        {filterList(data).map((car) => (
                            <div key={'car_' + car.hash}>
                                <CarListRow car={car} fnUpdate={() => setUpdateData(!updateData)} showPrice={showPrice} selectedCarId={selectedCarId} setSelectedCarId={setSelectedCarId} />
                            </div>
                        ))}
                        <div className='w-full flex items-center justify-center font-normal text-3xl'>{filterList(data).length === 0 ? 'No cars available with the selected filters' : ''}</div>
                    </div>
                    <div className='hidden sm:block col-span-1  sticky top-0'>
                        <ShoppingBasket showPrice={showPrice} updateBasket={updateData} fnUpdate={() => setUpdateData(!updateData)} />
                        <div className=''><CustomerManagerInformationBox title='Your personal contact' /></div>
                        <div className=''><DownloadCarListInExcelFormat data={filterList(data)} /></div>
                        <div className='flex items-center justify-center mt-8'>
                            <div className='text-xl mr-2'>Symbols</div>
                            <div className='flex items-center justify-end text-xs'>
                                <div className='mr-2 flex items-center'><VATIcon vatStatusId={4} />&nbsp;&nbsp;VAT&nbsp;Included/Margin</div>
                                <div className='mr-2 flex items-center'><VATIcon vatStatusId={0} />&nbsp;&nbsp;VAT&nbsp;Excluded/Net</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden flex z-10 bottom-0 h-[80vh] overflow-auto   right-0 fixed" >
                    <div className="float-right justify-end w-['10%'] transition-transform ease-in-out duration-300 transform">
                        <div className=" h-[100%] flex justify-center items-center ">
                            <div className="py-2 px-1 rounded bg-yellow-400">
                                {isModalOpen ?

                                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    :
                                    <div className="relative ">
                                        {cartLength > 0 && < span className="absolute px-1 text-[10px] font-bold right-0 bottom-6 rounded bg-white">{cartLength}</span>}
                                        <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>

                                }

                            </div>
                        </div>
                    </div>
                    {isModalOpen && <div className='w-[90%] transition-transform ease-linear duration-300 transform max-w-max bg-white'>
                        <ShoppingBasket showPrice={showPrice} updateBasket={updateData} fnUpdate={() => setUpdateData(!updateData)} />
                        <div className=''><CustomerManagerInformationBox title='Your personal contact' /></div>
                        <div className=''><DownloadCarListInExcelFormat data={filterList(data)} /></div>
                        <div className=' my-2 bg-white px-2'>
                            <div className='text-[10px] bg-white mx-2 my-3 text-xs font-bold n'>Symbols</div>
                            <div className='flex bg-white items-center justify-end text-xs'>
                                <div className='mr-2 flex items-center'><VATIcon vatStatusId={4} />&nbsp;&nbsp;VAT&nbsp;Included/Margin</div>
                                <div className='mr-2 flex items-center'><VATIcon vatStatusId={0} />&nbsp;&nbsp;VAT&nbsp;Excluded/Net</div>
                            </div>
                        </div>
                    </div>}
                </div>s

            </div>
        )
    } else {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <div className='mb-[100px] grid grid-cols-1 place-items-center'>
                    <div className=''><Loader color="#F1CA51" variant="bars" size={100} /></div>
                    <div className='animate-bounce text-2xl mt-2 font-semibold text-purchase-color leading-tight tracking-tight'>Loading car list ...</div>
                </div>
            </div>
        )
    }
}
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export const CarImageModal = ({ images, visible, setVisible, imageIndex }) => {
    const scrollRef = useRef(null);
    const [scrollDirectionDown, setScrollDirectionDown] = useState(true);

    const handleScrollALittle = () => {
        if (scrollRef.current && scrollDirectionDown) {
            const maxHeight = scrollRef.current.scrollHeight;
            scrollRef.current.scrollTop = maxHeight - (maxHeight > 800 ? 800 : 0);
            setScrollDirectionDown(false);
        }

        if (scrollRef.current && !scrollDirectionDown) {
            scrollRef.current.scrollTop = 0;
            setScrollDirectionDown(true);
        }
    };

    const handleImageLoad = (index) => {
        if (index === imageIndex) {
            const element = document.getElementById('large_image_' + index);

            if (element) {
                element.scrollIntoView();
            }
        }
    }


    return (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as="div" className="z-10 h-[600px] relative" onClose={setVisible}>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className=" inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={(e) => { console.log('her'); e.stopPropagation() }} />
                </Transition.Child>

                <div className=" inset-0 z-10 w-screen flex items-center justify-center ">
                    <div className="flex justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel id='panel' className="transform rounded-lg bg-white px-4 pt-5 flex flex-wrap shadow-xl w-[500px] h-[400px] lg:h-[700px] lg:w-[1000px]">
                                <div className='absolute top-[-30px] right-[-25px] mr-6 mt-4 cursor-pointer z-20 ' onClick={() => setVisible(false)}>
                                    <div className='rounded-full bg-gray-500 flex overflow-visible items-center justify-center font-bold text-white w-[40px] h-[40px]'>
                                        <span className="material-symbols-outlined">
                                            close
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap w-full h-[600px] overflow-y-scroll mt-4 p-5" ref={scrollRef}>
                                    <div className="space-y-4 flex flex-wrap">
                                        {images.map((image, index) => (
                                            <div key={index}>
                                                <img id={'large_image_' + index} src={image.file_url} className='rounded object-cover' alt='Car' onLoad={() => handleImageLoad(index)} />
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                                <div className='h-[20px]'></div>

                                <div className='absolute bottom-[10px]  left-0 mr-6 mt-4 cursor-pointer w-full' onClick={handleScrollALittle}>
                                    <div className='flex items-center justify-center'>
                                        <div className='rounded-full bg-gray-500 flex overflow-visible items-center justify-center font-bold text-white w-[40px] h-[40px]'>
                                            <span className="material-symbols-outlined">
                                                {scrollDirectionDown ? 'expand_more' : 'expand_less'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

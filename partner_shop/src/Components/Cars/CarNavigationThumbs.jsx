import { useRef } from "react";

export const CarNavigationThumbs = ({ images, maxImagesNumber, onClick }) => {
    const imageListRef = useRef(null);
    const handleOnClick = (e, index) => {
        e.stopPropagation();
        onClick(index);
    }

    return (
        <div className="w-full">
            <div ref={imageListRef} className='flex flex-wrap items-center'>
                {images.map((image, index) => {
                    if (index >= maxImagesNumber) return '';
                    return (
                        <div id={'image_' + index} key={'image_thumb_' + index} className='mr-4 object-cover cursor-pointer w-[40px] h-[40px] mb-1' onClick={(e) => handleOnClick(e, index)}>
                            <img src={image.thumb_file_url} className='rounded grow-on-hover-15 hover:p-1 hover:border hover:border-slate-300' alt='small car' />
                        </div>
                    )
                })}
                {images.length > maxImagesNumber ? <div className='text-sm'>+{images.length - maxImagesNumber} more</div> : ''}
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";

export const CarImageCarousel = ({ delay }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'car1.png',
        'car2.png',
        'car3.png',
        'car4.png',
        'car5.png',
        'car6.png',
        'car7.png',
        'car8.png',
    ];

    const switchImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(switchImage, delay);

        return () => clearInterval(intervalId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            {images.map((imageUrl, index) => (
                <img
                    key={index}
                    src={'/cars/' + imageUrl}
                    alt={`Car ${index + 1}`}
                    className={`absolute top-0 left-0 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-500 ease-in-out`}
                />
            ))}
        </div>
    );
}

import React from "react";
import { axiosInstance } from "../../Api/AxiosConfig";

export const AddToBasketButton = ({ hash, fnUpdate }) => {
    const addItemToBasket = (hash) => {
        axiosInstance
            .post("shop/add-to-basket", { carHash: hash })

            .then(() => {
                fnUpdate();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <button
            className="rounded-md  bg-purchase-color  px-[8px] py-[3px] h-[30px] w-[50px] hover:scale-[1.15] duration-300"
            onClick={(e) => { e.stopPropagation(); addItemToBasket(hash); }}>
            <span className=" material-symbols-outlined text-[5] text-white " title="Add this car to order list">
                shopping_cart
            </span>
        </button>
    )
}

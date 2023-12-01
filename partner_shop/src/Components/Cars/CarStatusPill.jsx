import React from "react";

export const CarStatusPill = ({title, bgColor, className}) => {
    return (
        <span className={'z-10 py-1 px-2 text-white text-center rounded ' + bgColor + ' ' + className}>
            {title}
        </span>
    )
}
export const OrderField = ({ id, label, text, textClass }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-xs md:text-sm uppercase font-semibold text-gray-500">{label}</label>
            <div id={id} className={"mt-1 text-xs md:text-sm" + textClass}>{text}</div>
        </div>
    )
}
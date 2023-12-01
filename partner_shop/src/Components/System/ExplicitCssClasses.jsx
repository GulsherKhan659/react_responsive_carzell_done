export const ExplicitCssClasses = () => {
    // This is to make sure that tailwind classes that are used in variables are also generated in the output css file
    return (<div className='hidden fast-delivery reservable line-through'></div>)
}
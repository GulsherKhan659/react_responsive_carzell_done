export const Terms = () => {

    const informationPoint = (title, text) => {
        const textWithNewline = text.split('\n').map((item, key) => (
            <span key={key}>{item}<br /></span>
        ));
        return (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-bold text-gray-900">{title}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{textWithNewline}</dd>
            </div>
        )
    }

    return (
        <div className=''>
            <div className="overflow-auto h-[100vh] bg-white shadow sm:rounded-lg max-w-[1200px]  my-[20px] md:my-[50px] mx-[4px] md:mx-[25px]">
                <div className="px-4 py-6 sm:px-6">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">Terms</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Terms of service</p>
                    <div className='mt-4'>
                        Welcome to Carzelle Shop, exclusively serving CarDealers. Please read these terms carefully before using our platform. By using our services, you agree to be bound by these terms.
                    </div>
                </div>
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {informationPoint('In stock', 'Cars listed as "In Stock" are confirmed, and Carzelle A/S is the current owner.')}
                        {informationPoint('Reserveable', 'Cars listed as "Reserveable" are offered in collaboration with a third party. Carzelle A/S will purchase these cars once you confirm the deal on our site. Availability is subject to change, and we make every effort to display cars that are reserved for us.')}
                        {informationPoint('Payment', 'All prices are listed in the currency stated on the invoice.')}
                        {informationPoint('Order Confirmation', 'After confirming a deal, Carzelle will provide information regarding payment, transport, and confirmation within approximately 2 days.')}
                        {informationPoint('Cancellation', 'All orders are considered final. If a buyer wishes to cancel, a minimum cancellation fee of 10% of the purchase price will apply.')}
                        {informationPoint('Seller and Owner', 'Carzelle A/S\nBakketoften 3\n 8541 Skødstrup\nDenmark\nVAT: DK44210223\ninfo@carzelle.com')}
                        {informationPoint('Cosmetic Condition', 'The cosmetic condition of cars is described for each listing, and damages may be shown in photos. If you receive a vehicle that doesn\'t meet your expectations, please send photos of any damage to info@carzelle.com.')}
                        {informationPoint('COC Document', 'A Certificate of Conformity (COC) document may not be included for all cars. We make our best effort to provide this document for most cars.')}
                        {informationPoint('Second Key', 'A second key may not be included for all cars.')}
                        {informationPoint('Transport', 'If you book transport through us, car documents will be released after full payment is received. You are also welcome to use your own transport company.')}
                        {informationPoint('VAT (Value Added Tax)', 'Cars sold to buyers outside Denmark will be sold excluding VAT, unless the car has already paid VAT. In such cases, the invoice will state "Reverse-Charge - buyer must settle the VAT."')}
                        {informationPoint('Liability', 'Carzelle cannot be held accountable for unexpected delays or issues that may arise during the car acquisition process. We encourage you to exercise reasonable care and judgment in all interactions and transactions. By using Carzelle Shop, you agree to these terms. If you have any questions or concerns, please contact us at info@carzelle.com.')}
                        {informationPoint('Legal Jurisdiction', 'Any legal matters shall be resolved in the Court of Aarhus, Denmark.')}
                    </dl>
                </div>
            </div>
            <div className='h-[100px]' ></div>
        </div>
    )
}
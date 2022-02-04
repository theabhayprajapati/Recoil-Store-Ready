import React from 'react';

const Order = ({ id, amountShipping, timestamp, images, amount }) => {

    return <div className='related rounded-md  border '>
        <div className='justify-between flex px-10 bg-gray-100 '>
            <div className='flex gap-3'>
                <div>
                    Order Placed
                    <div>
                        2 Feb 2022
                        {
                            typeof window === 'object' && window.location.pathname
                        }
                    </div>
                </div>
                <div>
                    Total Amount
                    <div>
                        ₹{amount}
                    </div>
                </div>
                <div>
                    Order id
                    <div>
                        #2324kEWRK8
                    </div>
                </div>
            </div>
            <div>
                Items
                <div>
                    1
                </div>
            </div>
            <section>

            </section>

        </div>
    </div>;
};

export default Order;

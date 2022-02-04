import { collection, doc, getDoc, getDocFromCache, getDocs, orderBy, query } from 'firebase/firestore';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { db } from '../components/firebase';
import Header from '../components/Header';
import Order from '../components/Order';

const Orders = ({ orders }) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const { data: session } = useSession();
    console.log(`Order details 🛒`, orders);
    return <div>

        <Header />
        <main className="max-w-screen-lg mx-auto p-10">
            <h1 className='text-3xl border-b mb-2 pcb-1 border-yellow-400'>
                Your Orders'


            </h1>
            {
                session ? (
                    <h2>
                        X Orders'
                    </h2>
                ) : (
                    <h1>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas libero enim possimus rerum sit dignissimos, odit est modi eaque ratione.
                    </h1>
                )
            }

            <div>
                {
                    orders.map(({ amount, id }) => {
                        return <div key={id}> Order amount: ₹{amount} </div>
                    })
                }
            </div>
        </main>
    </div>;
};

export default Orders;
export const getServerSideProps = async (context) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const session = await getSession(context)
    if (!session) {
        return {
            props: {},
        }
    }
    // * getting data from the 🔥base
    const colRef = collection(db, 'users', session.user.email, 'orders')
    const stripeOrders = await getDocs(query(colRef, orderBy('timestamp', 'desc')));
    // console.log(`✅${stripeOrders.docs}`);
    // * passing data to stripe
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )
    return {
        props: {
            orders
        }
    }
}
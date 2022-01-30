import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CartItem, CartItemType } from '.';

// ! first we need to make striep promisse
const stripePromise = loadStripe(`pk_test_51KNYXJKvwmobunjYm1fzWFHWg1iEzpxivSqW5C6NuJZriyhJdM7XVsTepHih7S4qgixYYA9M04Jtc6o837RDDMM300AXgDON0L`)
const Basket = () => {
    const { data: session } = useSession()
    const CartitemBasket = useRecoilValue(CartItem)
    const createCheckoutsession = async () => {
        const stripe = await stripePromise
        // * call the backend:--
        console.log('stripePromise clear');
        const checkoutSessions = await axios.post('/api/create-checkout-session',
            {
                // * the main problem was with email and 
                items: CartitemBasket,
                email: 'abhayoprajapati@gmail.com',
            })
        console.log('All good checkoutSessions 📤');
        // * redirect user and cutomto stripe
        // @ts-ignore
        // ? Redirect user to stripe checkout page

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSessions.data.id,
        })
        console.log(result.error);




    }

    console.log("Basket Items", CartitemBasket);
    const total = (item: CartItemType[]) => item.reduce((sum: number, item) => sum + item.amount * item.price, 0)
    return (
        <div className='font-mono'>
            <h1 className="text-2xl font-mono">Your Basket</h1>
            {
                CartitemBasket.length === 0 ? (<div className='text-xl'> You cart is empty</div>) : (<div className='text-xl'> Your cart is having {CartitemBasket.length} items</div>)}
            <main className='flex border-2'>
                <div className='w-[60%] border-2 px-2'>
                    {CartitemBasket.length > 0 && (<div>
                        Showing Items'
                        {CartitemBasket.map(item => {
                            return (
                                <div key={item.id}>
                                    <h1>
                                        {item.title}
                                    </h1>
                                    <img className="h-36 w-36 object-contain" src={item.image} alt={item.title} />
                                    <p>Price:${item.price}</p>
                                    <p>qty:
                                        {item.amount}
                                    </p>
                                    <p>total: $ {item.price * item.amount}</p>
                                </div>
                            )
                        })}
                    </div>)}
                </div>
                <div className='w-[40%] border-2 p-2'>
                    {
                        session ? (<div>

                            <h1>Hellow {(session.user.name)?.split(' ')[0]}
                            </h1>
                            {
                                CartitemBasket.length === 0 ? (<div> Go some more <Link href={'/'}> go to home </Link></div>) : (<div>
                                    <button role="link" onClick={createCheckoutsession} className='bg-yellow-400 rounded-md '>
                                        Checkout for $ {total(CartitemBasket)}
                                    </button>

                                </div>)
                            }
                        </div>) : (
                            <div>
                                <h1>
                                    sigin to Checkout
                                    <button onClick={() => signIn()} className='bg-blue-400 rounded-md '>
                                        signIn
                                    </button>
                                </h1>
                            </div>
                        )
                    }

                </div>
            </main>
        </div>)
};

export default Basket;

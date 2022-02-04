import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { CartItem } from '../pages';

const Header = () => {
    const { data: session } = useSession()
    const Cart = useRecoilValue(CartItem)
    return <div>
        <div className='flex justify-between bg-blue-300 rounded-md min-w-full px-5 '>
            <h1>
                Shopping cart
            </h1>
            <div>
                <div>
                    {
                        session ? (<div>
                            {session?.user.email}
                            {(session?.user.name)}
                            <button onClick={() => signOut()} className='bg-red-300 rounded-md active:bg-red-400 hover:bg-red-200'>
                                Sign Out button</button>
                        </div>) : <div>
                            <button onClick={() => signIn()}>
                                signIn
                            </button>
                        </div>
                    }
                </div>
            </div>

            <h1>
                <Link href={'/Basket'}> Basket</Link>
                {Cart.length}
            </h1>
        </div>
    </div>;
};

export default Header;

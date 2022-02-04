import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router'

const Success = () => {
    // console.log(window)
    const router = useRouter()
    return <div className="bg-green-100 h-screen">
        <Header />
        <main className="max-w-screen-lg mx-auto">

            <div className="flex flex-col p-10  bg-white">
                <div className='flex items-center space-x-2 mb-5'>
                    <CheckCircleIcon className="text-green-500 h-10 " />
                    <h1 className='text-3xl '>
                        Your order had been confirmed !
                    </h1>
                </div>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia repudiandae odit ipsa consectetur hic deleniti tempora sint, velit exercitationem nesciunt!

                </p>

                <button className=" w-full h-10 bg-yellow-300 rounded-md active:bg-yellow-400 hover:bg-yellow-200" onClick={() => router.push('/Orders')} >
                    <p>  Go to your order</p>
                </button>
            </div>
        </main>
    </div>;
};

export default Success;

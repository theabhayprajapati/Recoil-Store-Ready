import { GetStaticProps } from 'next';
import { atom, useRecoilState } from 'recoil';

import { useSession, signIn, signOut } from "next-auth/react"
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
export type CartItemType = {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
  amount: number;
  category: string;
}

export const CartItem = atom({
  key: 'CartItem',
  default: [] as CartItemType[]

})
// @ts-ignore
export default function Home() {
  
  const { data: session } = useSession()
  console.log(session);
  // const [loading, setloading] = useState(true);
  const [FetchProducts, setFetchProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then((response) => response.json()).then((data) => setFetchProducts(data))
  }, []);
  console.log("Fetched data", FetchProducts);
  const [Cart, setCart] = useRecoilState(CartItem);
  const HandleAddToCart = (ClickedItem: CartItemType) => {
    setCart(prev => {
      const isitemthere = prev.find(item => item.id === ClickedItem.id)
      if (isitemthere) {
        return prev.map(item => (

          item.id === ClickedItem.id ? {
            ...item, amount: item.amount + 1
          } : item
        ))
      }
      return [...prev, { ...ClickedItem, amount: 1 }]
    })
  }


  console.log("CartItems", Cart);
  return (
    <div className="">
      <Head>
        <title>
          Store from typescript
        </title>
      </Head>
      <main className="m-5 text-2xl">

        <Header />
        <div className='pt-10'>
          <div>
            {
              // @ts-ignore

            }
          </div>
          {
            FetchProducts.map((product: CartItemType) => {
              return (
                <div key={product.id} >

                  <h1>{product.title}</h1>
                  <img src={product.image} className="h-36 w-36 object-contain" alt={product.title} />
                  <p>{product.description}</p>
                  <p>$ {product.price}</p>
                  <button onClick={() => HandleAddToCart(product)} className="bg-yellow-400 rounded-md"> Add to Cart</button>
                </div>
              )
            })
          }

        </div>
      </main >
    </div >
  )
}

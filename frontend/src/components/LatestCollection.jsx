import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [ latestProducts, setLatestProducts ] =  useState([]);

    const lcRef = useRef(null);

    useEffect(() => {
      gsap.fromTo(lcRef.current, {opacity: 0, y:50}, {opacity: 1, duration: 1, y:0, ease: "power3.out", 
        scrollTrigger: {
            trigger: lcRef.current,
            start: "top 80%", // when card comes into viewport
            toggleActions: "play none none reverse",
        }
      },
      )
    })

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, Lorem ipsum dolor sit amet.
        </p>
      </div>
      {/* Rendering Products  */}
      <div ref={lcRef} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollection

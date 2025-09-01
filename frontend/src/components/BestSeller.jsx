import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    const bsRef = useRef(null);

    useEffect(() => {
      gsap.fromTo(bsRef.current, {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 1, ease: 'power3.out', 
        scrollTrigger: {
          trigger: bsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          // scrub: true          // scrub means animation is linked to scrollbar movement
        }
      })
    })

    useEffect(() => {
        const bestProducts = products.filter((item) => (item.bestseller))    // only show if bestseller is true
        setBestSeller(bestProducts.slice(0, 5))
    }, [products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eveniet! Ducimus perferendis beatae nulla harum natus assumenda mollitia iure amet?
        </p>
      </div>

      <div ref={bsRef} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item, index) => (
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller

import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center sm:flex-row border border-gray-400 text-center'>      {/* sm:flex-row border border-gray-400 */}
        {/* hero left side  */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#414141'></p>
            </div>
        </div>
      </div>
      {/* hero right side  */}
      <img className='w-full sm:w-1/2 ' src={assets.hero_img} alt="" />

      {/* <div className='block text-8xl py-8 font-bold text-green-900'>
        <h1>Shop Sustainably,</h1>
        <h1>High Responsibility</h1>
      </div>
      <p className='text-gray-500 text-3xl lg:text-nowrap sm:text-wrap'>Discover your eco friendly products that reduce your carbon footprint and <br /> contribute to a cleaner planet</p>
      <button className='bg-green-900 flex text-2xl font-semibold w-[140px] h-[40px] justify-center'>Shop Now
        <img className='size-5 text-black' src={assets.dropdown_icon} alt="" />
      </button>
      */}
    </div> 
  )
}

export default Hero

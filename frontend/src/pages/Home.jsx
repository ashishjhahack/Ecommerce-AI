import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import TopFeatures from '@/components/TopFeatures'
import ScrollVelocity from '../components/ScrollVelocity';
import Banner from '@/components/Banner'

const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <ScrollVelocity
        texts={[".Shop Smart", ".Best Sellers"]}
        
        className="custom-scroll-text mt-5"
      />
      <TopFeatures />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home

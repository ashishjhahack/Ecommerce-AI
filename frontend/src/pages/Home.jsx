import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import TopFeatures from '@/components/TopFeatures'
import ScrollVelocity from '../components/ScrollVelocity';

const Home = () => {
  return (
    <div>
      <Hero />
      <ScrollVelocity
        texts={[".Shop Smart", ".Best Sellers"]}
        
        className="custom-scroll-text"
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

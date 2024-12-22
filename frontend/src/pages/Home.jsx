import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import NewsletterBox from '../components/NewsletterBox'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <NewsletterBox/>
    </div>
  )
}

export default Home
import React from 'react'
import Trending from './Trending'
import Popular from './Popular';
import HeroBanner from './heroBanner/HeroBanner'
import TopRated from './TopRated';

const Home = () => {
  return (
    <div className='homePage noscroll bg-[#04152d]'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home;
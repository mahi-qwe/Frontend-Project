import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import RecentlyVisited from '../Components/RecentlyVisited/RecentlyVisited.jsx'
import NewCollections from '../Components/NewCollections/NewCollections.jsx'

const Shop = () => {
  return (
    <div>
        <Hero />
        <NewCollections />
        <Popular />
        <RecentlyVisited />
    </div>
  )
}

export default Shop
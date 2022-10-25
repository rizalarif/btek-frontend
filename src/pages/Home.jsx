import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home &middot; <Link to="/character">Go to Character List</Link></div>
  )
}

export default Home

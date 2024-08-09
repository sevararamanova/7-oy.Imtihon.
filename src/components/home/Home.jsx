import React from 'react'
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import Hero from '../../components/hero/Hero'
import './home.css';

const Home = () => {
  return (
    <div className='home'>
        <DashboardSide />
        <Hero/>
        <LastLinearSide/>
    </div>
  )
}

export default Home
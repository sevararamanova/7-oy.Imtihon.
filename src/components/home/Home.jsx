import React from 'react';
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import Hero from '../../components/hero/Hero';
import FooterSide from '../../components/footer/Footer';
import './home.css';

const Home = () => {
  return (
    <div className='container'>
      <div className='home'>
        <DashboardSide />
        <Hero />
        <LastLinearSide />
      </div>
      <FooterSide/>
    </div>
  );
}

export default Home;

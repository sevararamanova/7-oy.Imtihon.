import React from 'react'
import DashboardSide from '../../components/dashboard/Dashboard';
import LastlinearSide from '../lastLinear/Lastlinear';
import FooterSide from '../../components/footer/Footer';
import LikedSongs from '../../components/likedPage/LikedSongs';
import './liked.css';

const Liked = () => {
  return (
    <div className='container'>
    <div className='liked'>
        <DashboardSide />
        <LikedSongs/>
        <LastlinearSide/>
        </div>
      <FooterSide />
      </div>
  )
}

export default Liked
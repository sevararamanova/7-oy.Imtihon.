import React from 'react'
import DashboardSide from '../../components/dashboard/Dashboard';
import LastlinearSide from '../lastLinear/Lastlinear';
import './liked.css';

const Liked = () => {
  return (
    <div className='liked'>
        <DashboardSide />
        <h1>Liked-songs page</h1> 
        <LastlinearSide/>

    
        </div>
  )
}

export default Liked
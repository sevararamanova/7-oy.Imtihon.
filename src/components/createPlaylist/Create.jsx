import React from 'react'
import DashboardSide from '../../components/dashboard/Dashboard';
import LastlinearSide from '../lastLinear/Lastlinear';
import './create.css';

const Create = () => {
  return (
    <div className='create'>
        <DashboardSide/>
        <LastlinearSide/>
       <h1>Create-Playlist page</h1>
    </div>
  )
}

export default Create
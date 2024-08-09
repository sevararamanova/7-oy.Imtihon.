import React from 'react'
import './library.css';
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import "../../App.css"
const Library = () => {
  return (
    <div className='library'>
         <DashboardSide/>
         <LastLinearSide/> 
         <div className='library__content'>
        <h1>Your Library Page</h1>
         </div>
      
  
    </div>
  )
}

export default Library
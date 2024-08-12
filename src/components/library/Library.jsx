import React from 'react'
import './library.css';
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear'; 
import FooterSide from '../../components/footer/Footer';
import YourLibrary from './YourLibrary';
import "../../App.css"
const Library = () => {
  return (
    <div className='container'>
    <div className='library'>
         <DashboardSide/>
         <YourLibrary/>
         <LastLinearSide/> 
    </div>
        <FooterSide/>
    </div>
  )
}

export default Library
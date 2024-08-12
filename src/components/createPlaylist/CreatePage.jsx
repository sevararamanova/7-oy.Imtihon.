import React from 'react'
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import Create from './Create.jsx'
import './createPage.css'



const CreatePage = () => {
  return (
    <div className='container'>
        <div className='createPage'>
            <DashboardSide/>
            <Create/>
            <LastLinearSide/>
        </div>
    </div>
  )
}

export default CreatePage
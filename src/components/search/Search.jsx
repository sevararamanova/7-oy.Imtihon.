import React from 'react'
import '../search/search.css';
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import FooterSide from '../../components/footer/Footer';
import SearchPage from './SearchPage';
import '../../App.css';

const Search = () => {
  return (
    <div className='container'>
    <div className='search'>
            <DashboardSide/> 
            <SearchPage/>
            <LastLinearSide/>
    </div>
       <FooterSide/>
    </div>
  )
}

export default Search
import React from 'react'
import '../search/search.css';
import DashboardSide from '../../components/dashboard/Dashboard';
import LastLinearSide from '../../components/lastLinear/Lastlinear';
import '../../App.css';

const Search = () => {
  return (
    <div className='search'>
            <DashboardSide/> 
            <LastLinearSide/>
        <div className='search__content'>
          <h1>Search page</h1>
       
        </div>
    </div>
  )
}

export default Search
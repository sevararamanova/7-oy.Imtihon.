import React from 'react'
import forward from '../../images/Forward.png';
import back from "../../images/Back.png";
import './header.css';

const Header = () => {
  return (
    <div className='header'>
        <img src={back}/>
        <img src={forward}/>

    </div>
  )
}

export default Header
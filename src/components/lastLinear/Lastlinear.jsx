import React from 'react'
import close from '../../images/Close.png';
import userPlus from '../../images/User-Plus.png';
import userBlue from '../../images/UserBlue.png';
import union from '../../images/Union.png';
import './lastLanear.css';

const Lastlinear = () => {
  return (
    <div className='last'>
        <div className='last__content'>
            <div className='i'>
            <p>Friend Activity</p>
            </div>
            <div className='icon'>
                <img src={userPlus}/>
                <img src={close} />
            </div>
        </div>
        <div className='last__p'>
            <p> <br></br>Let friends and followers on Spotify <br></br>see what you’re listening to.</p>
        </div>
     <br></br>
     <br></br>
        <div className='icons'>
            <img src={userBlue}/>
            <img src={union}/>
        </div>

        <div className='icons'>
            <img src={userBlue}/>
            <img src={union}/>
        </div>

        <div className='icons'>
            <img src={userBlue}/>
            <img src={union}/>
        </div>

        <div className='settings'>
            <p>Go to Settings  Social and enable<br></br> “Share my listening activity on <br></br>Spotify.’ You can turn this off at any<br></br> time.</p>
        </div>
         <button>Settings</button>
       </div>
  )
}

export default Lastlinear
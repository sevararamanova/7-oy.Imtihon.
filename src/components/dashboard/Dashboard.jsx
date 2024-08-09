import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import home from '../../images/Home.png';
import search from '../../images/Search.png';
import library from '../../images/Library.png';
import plus from '../../images/plus.png';
import liked from '../../images/Liked.png';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__pages'>
        <div className='icons'>
          <Link to="/">
            <img src={home} alt="/" width={35} height={30} />
            <p>Home</p>
          </Link>
        </div>
        <div className='icons'>
          <Link to="/search">
            <img src={search} alt="search" width={35} height={30} />
            <p>Search</p>
          </Link>
        </div>
        <div className='icons'>
          <Link to="/library">
            <img src={library} alt="library" width={35} height={30} />
            <p>Your Library</p>
          </Link>
        </div>
        <div className='second'>
          <div className='icons'>
            <Link to="/createPlaylist">
              <img src={plus} alt="plus" width={38} height={35} />
              <p>Create Playlist</p>
            </Link>
          </div>
          <div className='icons'>
            <Link to="/liked">
              <img src={liked} alt="liked" width={38} height={35} />
              <p>Liked Songs</p>
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='dashboard__contents'>
        <p>Chill Mix</p>
        <p>Insta Hits</p>
        <p>Your Top Songs 2021</p>
        <p>Mellow Songs</p>
        <p>Anime Lofi & Chillhop Music</p>
        <p>BG Afro “Select” Vibes</p>
        <p>Afro “Select” Vibes</p>
        <p>Happy Hits!</p>
        <p>Deep Focus</p>
        <p>Instrumental Study</p>
        <p>OST Compilations</p>
        <p>Nostalgia for old souled mill...</p>
        <p>Mixed Feelings</p>
      </div>
    </div>
  );
}

export default Dashboard;

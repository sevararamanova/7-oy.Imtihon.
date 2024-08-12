// src/components/hero/Hero.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { fetchFeaturedPlaylists, fetchTopMixes } from '../../api/spotify';
import MadeComponent from '../../components/made/Made';
import ReacentlyComponent from '../../components/recently/Recently';
import JumpBackComponent from '../../components/jump/JumpBack';
import UniquelyComponent from '../../components/uniquely/Uniquely';
import { Carousel } from 'antd';
import './hero.css';



const Hero = () => {
  const [playlists, setPlaylists] = useState([]);
  const [topMixes, setTopMixes] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const fetchedPlaylists = await fetchFeaturedPlaylists();
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    const loadTopMixes = async () => {
      try {
        const fetchedTopMixes = await fetchTopMixes();
        setTopMixes(fetchedTopMixes);
      } catch (error) {
        console.error('Error fetching top mixes:', error);
      }
    };

    loadPlaylists();
    loadTopMixes();
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const topMixesChunks = chunkArray(topMixes, 4);

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`); // Navigate to dynamic playlist page
  };

  return (
    <div className='hero'>
      <Header />
      <div className='hero__music'>
        <h1>Good Afternoon</h1>
        <div className='playlists'>
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className='playlist'
              onClick={() => handlePlaylistClick(playlist.id)} // Handle click event
            >
              <img src={playlist.images[0]?.url} alt={playlist.name} />
              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='topMixes'>
        <span>Your Top Mixes</span>
        <Carousel arrows infinite={false} className='topMixesCarousel'>
          {topMixesChunks.map((chunk, index) => (
            <div key={index}>
              <div className='topMixes__container'>
                {chunk.map((topMix) => (
                  <div key={topMix.id} className='topMixes__item'>
                    <img src={topMix.images[0]?.url} alt={topMix.name} />
                    <p>{topMix.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <MadeComponent />
      <ReacentlyComponent />
      <JumpBackComponent />
      <UniquelyComponent />
    </div>
  );
};

export default Hero;

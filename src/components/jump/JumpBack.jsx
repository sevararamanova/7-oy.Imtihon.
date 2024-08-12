import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import './jumpBack.css'; 

const tokenUrl = 'https://accounts.spotify.com/api/token';
const categoryPlaylistsUrl = 'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists';

const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  return data.access_token;
};

const fetchCategoryPlaylists = async () => {
  const token = await getAccessToken();
  const response = await fetch(categoryPlaylistsUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data.playlists.items;
};

const JumpBack = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const fetchedPlaylists = await fetchCategoryPlaylists();
      setPlaylists(fetchedPlaylists);
    };

    loadPlaylists();
  }, []);

  // `playlists`ni karusel uchun kerakli sahifalarga bo'lish
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const playlistsChunks = chunkArray(playlists, 4);

  return (
    <div className='jumpBack'>
      <span>Jump Back In</span>
      <Carousel arrows infinite={false} className='jumpBackCarousel'>
        {playlistsChunks.map((chunk, index) => (
          <div key={index}>
            <div className='jumpBack__container'>
              {chunk.map((playlist) => (
                <div key={playlist.id} className='jumpBack__item'>
                  <img src={playlist.images[0]?.url} alt={playlist.name} />
                  <p>{playlist.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default JumpBack;

import React, { useEffect, useState, useRef } from 'react';
import { Table, Spin, Button } from 'antd';
import './yourLibrary.css';

const tokenUrl = 'https://accounts.spotify.com/api/token';
const categoryPlaylistsUrls = [
  'https://api.spotify.com/v1/browse/categories/toplists/playlists',
  'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists',
  'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists',
  'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists'
];

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

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const data = await response.json();
  return data.access_token;
};

const fetchCategoryPlaylists = async () => {
  const token = await getAccessToken();
  const playlists = [];

  for (const url of categoryPlaylistsUrls) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        playlists.push(...data.playlists.items);
      } else {
        console.error(`Failed to fetch ${url}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  return playlists;
};

const YourLibrary = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const fetchedPlaylists = await fetchCategoryPlaylists();
        setPlaylists(fetchedPlaylists);
        setLoading(false);
      } catch (error) {
        console.error('Error loading playlists:', error);
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  useEffect(() => {
    if (audioRef.current && selectedTrack) {
      audioRef.current.src = selectedTrack.preview_url; // Replace with appropriate track URL
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedTrack, isPlaying]);

  const handleTrackPlayPause = (track) => {
    if (selectedTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedTrack(track);
      setIsPlaying(true);
    }
  };

  const columns = [
    {
      title: 'Playlist Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <img
            src={record.images[0]?.url}
            alt={record.name}
            style={{ width: '50px', marginRight: '10px' }}
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => handleTrackPlayPause(record)}
        >
          {selectedTrack?.id === record.id ? (isPlaying ? 'Pause' : 'Play') : 'Play'}
        </Button>
      ),
    }
  ];
  
  return (
    <div className='yourLibrary'>
      <div className='yourLibrary__content'>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={playlists.map((playlist, index) => ({
              ...playlist,
              key: playlist.id + index // Unik key yaratish
            }))}
            rowKey={record => record.key} // Unik key'ni ishlatish
            pagination={false}
          />
        )}
      </div>
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default YourLibrary;

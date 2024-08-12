import React, { useEffect, useState } from 'react';
import { Input, Card, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './searchPage.css';

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

const SearchPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const fetchedPlaylists = await fetchCategoryPlaylists();
        setPlaylists(fetchedPlaylists);
        setFilteredPlaylists(fetchedPlaylists);
        setLoading(false);
      } catch (error) {
        console.error('Error loading playlists:', error);
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredPlaylists(playlists);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filtered = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredPlaylists(filtered);
    }
  };

  return (
    <div className='searchPage'>
      <div className='searchPage__header'>
        <Input
         type="text"
          className="searchPage__searchInput"
          placeholder='Search playlists...'
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='searchPage__content'>
        {loading ? (
          <Spin size="large" />
        ) : (
          filteredPlaylists.length ? (
            filteredPlaylists.map((playlist, index) => (
              <Card
                key={`${playlist.id}-${index}`}  
                hoverable
                cover={<img alt={playlist.name} src={playlist.images[0]?.url} />}
                className='searchPage__card'
              >
                <Card.Meta title={playlist.name} />
              </Card>
            ))
          ) : (
            <div>No playlists found.</div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;

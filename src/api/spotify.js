// src/api/spotify.js

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenUrl = 'https://accounts.spotify.com/api/token';
const featuredPlaylistsUrl = 'https://api.spotify.com/v1/browse/featured-playlists';
const topMixesUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';
const playlistTracksUrl = (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

let accessToken = '';

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  try {
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
    accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const fetchFeaturedPlaylists = async () => {
  try {
    const token = await getAccessToken();

    const response = await fetch(featuredPlaylistsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured playlists');
    }

    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    throw error;
  }
};

export const fetchTopMixes = async () => {
  try {
    const token = await getAccessToken();

    const response = await fetch(topMixesUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top mixes');
    }

    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error('Error fetching top mixes:', error);
    throw error;
  }
};

export const fetchPlaylistTracks = async (playlistId) => {
  try {
    const token = await getAccessToken();

    const response = await fetch(playlistTracksUrl(playlistId), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist tracks');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    throw error;
  }
};

import React, { useEffect, useState, useRef } from 'react';
import { fetchFeaturedPlaylists, fetchPlaylistTracks } from '../../api/spotify';
import { FaPlay, FaPause } from 'react-icons/fa';

import './create.css';

const Create = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadPlaylistsData = async () => {
      try {
        const fetchedPlaylists = await fetchFeaturedPlaylists();
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    loadPlaylistsData();
  }, []);

  useEffect(() => {
    const loadPlaylistTracks = async () => {
      if (selectedPlaylist) {
        try {
          const fetchedTracks = await fetchPlaylistTracks(selectedPlaylist.id);
          setTracks(fetchedTracks);
        } catch (error) {
          console.error('Error fetching playlist tracks:', error);
        }
      }
    };

    loadPlaylistTracks();
  }, [selectedPlaylist]);

  useEffect(() => {
    if (audioRef.current && selectedTrack) {
      audioRef.current.src = selectedTrack.track.preview_url;
    }
  }, [selectedTrack]);

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!selectedTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='create-container'>
      <div className='playlist-selector'>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist)}
                className={selectedPlaylist?.id === playlist.id ? 'selected' : ''}
              >
                <img src={playlist.images[0]?.url} alt={playlist.name} className='playlist-image' />
                <p>{playlist.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists available</p>
        )}
      </div>

      {selectedPlaylist && (
        <div className='selected-playlist'>
          <h2>{selectedPlaylist.name}</h2>
          {selectedTrack && (
            <div className='selected-track__details'>
              <img
                src={selectedTrack.track.album.images[0]?.url}
                alt={selectedTrack.track.name}
                className='selected-track__image'
              />
              <div className='selected-track__info'>
                <p className='selected-track__name'>{selectedTrack.track.name}</p>
                <p className='selected-track__artists'>
                  {selectedTrack.track.artists.map((artist) => artist.name).join(', ')}
                </p>
                <div className='selected-track__controls'>
                  <button onClick={handlePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <audio ref={audioRef} />
                </div>
              </div>
            </div>
          )}
          <div className='playlist-table'>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Track Name</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {tracks.length > 0 ? (
                  tracks.map((track) => (
                    <tr
                      key={track.track.id}
                      className={`track-item ${selectedTrack?.track.id === track.track.id ? 'selected' : ''}`}
                      onClick={() => handleTrackClick(track)}
                    >
                      <td>
                        <img
                          src={track.track.album.images[0]?.url}
                          alt={track.track.name}
                          className='track-image'
                        />
                      </td>
                      <td>{track.track.name}</td>
                      <td>{track.track.artists.map((artist) => artist.name).join(', ')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No tracks available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;

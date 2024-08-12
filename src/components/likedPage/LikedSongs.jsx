
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHeart } from '../../redux/heartSlice';
import Header from '../../components/header/Header';
import 'antd/dist/reset.css'; 
import './likedSongs.css';

import likedImg from '../../images/likedSongs.png';
import { fetchFeaturedPlaylists, fetchPlaylistTracks } from '../../api/spotify';
import 'antd/dist/reset.css'; 
import './likedSongs.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 

const LikedSongs = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.heart.likedSongs);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const data = await fetchFeaturedPlaylists(); // Use fetchTopMixes() if needed
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const isLiked = (playlist) => {
    return likedSongs.some(likedItem => likedItem.id === playlist.id);
  };

  const handleHeartClick = (playlist) => {
    dispatch(toggleHeart(playlist));
  };

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'images',
      key: 'images',
      render: images => (
        <img
          src={images[0]?.url || 'default-image-url'}
          alt="playlist"
          className='playlist-image'
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button
  icon={isLiked(record)
    ? <AiFillHeart size={60} color="lightgreen" />
    : <AiOutlineHeart size={60} color="lightgreen" />}
  onClick={() => handleHeartClick(record)}
  style={{ border: 'none', background: 'transparent' }}
>
 
</Button>

      ),
    }
  ];

  if (loading) return <Spin tip="Loading..." />;

  return (
    <div className='liked-songs'>
      <Header />
     <img src={likedImg }/>
      <Table
        columns={columns}
        dataSource={playlists}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default LikedSongs;

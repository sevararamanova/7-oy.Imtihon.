import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/home/Home';
import Search from './components/search/Search';
import LibraryPage from './components/library/Library';
import LikedPage from './components/likedPage/Liked';
import CreatePage from './components/createPlaylist/CreatePage';
import Playlist from './components/PlayList';
import './App.css';

function App() {
  return (
      <div className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/createPlaylist" element={< CreatePage/>} />
          <Route path="/playlist/:playlistId"  element={<Playlist/>} />
        </Routes>
      </div>
  
  );
}

export default App;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHeart } from '../../redux/heartSlice';
import { AiOutlineHeart, AiFillHeart, AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import shuffleButton from '../../images/Shuffle.png';
import repeatButton from '../../images/Repeat.png';
import kattaChiziq from '../../images/kattaChiziq.png';
import chiziqcha from '../../images/chiziq.png';
import './footer.css';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.heart.likedSongs);

  const isLiked = (item) => {
    return likedSongs && likedSongs.some(likedItem => likedItem.id === item.id);
  };

  const handleHeartClick = (item) => {
    dispatch(toggleHeart(item));
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  // Example song (for demonstration purposes)
  const exampleSong = { id: 1, name: 'Song 1' };

  return (
    <div className='footer'>
      <div className='footer__controls'>
        <div 
          className='footer__button'
          onClick={() => handleHeartClick(exampleSong)}
        >
          {isLiked(exampleSong) 
            ? <AiFillHeart size={40} color="lightgreen" /> 
            : <AiOutlineHeart size={40} color="lightgreen" />}
        </div>
        <img src={shuffleButton} alt="Shuffle" className='shuffle__button' />
        {isPlaying 
          ? <AiOutlinePauseCircle size={65} color="white" onClick={handlePlayPauseClick} />
          : <AiOutlinePlayCircle size={65} color="white" onClick={handlePlayPauseClick} />}
        <img src={repeatButton} alt="Repeat" className='repeat__button' />
        <img src={chiziqcha} alt="Progress" className='footer__progress-line' />
      </div>
      <div className='footer__progress'>
        <img src={kattaChiziq} alt="Katta Chiziq" className='footer__katta-chiziq-image' />
      </div>
    </div>
  );
};

export default Footer;

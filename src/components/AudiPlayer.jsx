import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { play, pause, setTrack } from '../redux/audioSlice'; // Import actions
import './audiPlayer.css'; // Custom CSS if needed

const AudioPlayer = ({ trackUrl }) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTrack } = useSelector((state) => state.audio);
  const audioRef = useRef(null);

  useEffect(() => {
    if (trackUrl && trackUrl !== currentTrack) {
      dispatch(setTrack(trackUrl));
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.src = trackUrl;
        audioRef.current.play();
      } else {
        audioRef.current.src = trackUrl;
      }
    }
  }, [trackUrl, isPlaying, currentTrack, dispatch]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pause());
      audioRef.current.pause();
    } else {
      dispatch(play(trackUrl));
      audioRef.current.play();
    }
  };

  return (
    <div className="audio-player">
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src={trackUrl} />
    </div>
  );
};

export default AudioPlayer;

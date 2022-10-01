import {useEffect, useRef, useState} from 'react';
import {convertToPlaybackTime} from '../utils/utils';

const VIDEO_UPDATE_INTERVAL = 1000;

export const useVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [filmDuration, setFilmDuration] = useState('00:00:00');

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateVideoProgress = setInterval(() => {
      if (videoRef.current === null) {
        return;
      }

      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;

      if (isNaN(duration)) {
        return;
      }

      setCurrentProgress((currentTime / duration) * 100);

      const timeCountdown = convertToPlaybackTime(duration, currentTime);
      setFilmDuration(timeCountdown);
    }, VIDEO_UPDATE_INTERVAL);

    return () => clearInterval(updateVideoProgress);
  }, []);

  const handlePlayButton = () => {
    if (videoRef.current === null) {
      return;
    }

    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullScreenButton = () => {
    if (videoRef.current === null) {
      return;
    }

    if (!isInFullScreen) {
      videoRef.current
        .requestFullscreen()
        .then(() => setIsInFullScreen(false));
    }
  };

  return {isPlaying, handlePlayButton, handleFullScreenButton, currentProgress, filmDuration, videoRef};
};

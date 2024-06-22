import { useRef, useState } from 'react';
import styles from './CustomAudioPlayer.module.css'; // 모듈 CSS를 import 합니다.
import playIcon from '../../assets/images/play-circle-line.svg';
import pauseIcon from '../../assets/images/pause-circle-line.svg';

const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioPlayerContainer}>
      <audio ref={audioRef} src={src} />
      <button
        className={`${styles.playPauseButton} ${
          isPlaying ? styles.playing : ''
        }`}
        onClick={handlePlayPause}
      >
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? '일시정지' : '재생'}
        />
      </button>
      <div
        className={`${styles.playAnimation} ${
          isPlaying ? styles.playingAnimation : ''
        }`}
      ></div>
    </div>
  );
};

export default CustomAudioPlayer;

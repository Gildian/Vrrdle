import { useState, useRef, useEffect } from 'react';
import '../../styles/AudioPlayer.css';

const AudioPlayer = ({ src, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        setError(true);
      });
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || isLoading) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return duration ? (currentTime / duration) * 100 : 0;
  };

  if (error) {
    return (
      <div className={`audio-player error ${className}`}>
        <div className="audio-player-content">
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <span className="error-text">Unable to load audio</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`audio-player ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />
      
      <div className="audio-player-content">
        <div className="audio-player-header">
        </div>

        <div className="audio-controls">
          <button
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlayPause}
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            )}
          </button>

          <div className="progress-container">
            <div className="time-display current-time">
              {formatTime(currentTime)}
            </div>
            
            <div 
              className="progress-bar"
              ref={progressRef}

              onClick={handleProgressClick}
            >
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
                <div 
                  className="progress-thumb"
                  style={{ left: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="time-display duration">
              {formatTime(duration)}
            </div>
          </div>

          <div className="volume-container">
            <svg 
              width="20" 
              height="=20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="volume-icon"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="audio-visualizer">
          <div className="car-exhaust-container">
            {/* Car SVG Icon */}
            <svg 
              className={`car-icon ${isPlaying ? 'engine-running' : ''}`}
              viewBox="0 0 100 60" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car body main */}
              <rect x="15" y="25" width="65" height="15" rx="4" />
              <rect x="25" y="18" width="45" height="10" rx="3" />
              
              {/* Front and back bumpers */}
              <rect x="12" y="28" width="6" height="8" rx="2" fill="currentColor" opacity="0.8" />
              <rect x="77" y="28" width="6" height="8" rx="2" fill="currentColor" opacity="0.8" />
              
              {/* Wheels */}
              <circle cx="28" cy="45" r="8" fill="currentColor" />
              <circle cx="67" cy="45" r="8" fill="currentColor" />
              <circle cx="28" cy="45" r="5" fill="#181c24" />
              <circle cx="67" cy="45" r="5" fill="#181c24" />
              <circle cx="28" cy="45" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="67" cy="45" r="2" fill="currentColor" opacity="0.6" />
              
              {/* Simple exhaust port */}
              <ellipse cx="82" cy="32" rx="2" ry="1.5" fill="#181c24" opacity="0.8" />
              
              {/* Windshield - one continuous piece */}
              <rect x="30" y="19" width="35" height="7" rx="2" fill="#181c24" opacity="0.6" />
              
              {/* Side windows */}
              <rect x="35" y="20" width="8" height="5" rx="1" fill="#181c24" opacity="0.7" />
              <rect x="52" y="20" width="8" height="5" rx="1" fill="#181c24" opacity="0.7" />
              
              {/* Door lines */}
              <line x1="45" y1="25" x2="45" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="60" y1="25" x2="60" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              
              {/* Headlights */}
              <ellipse cx="15" cy="32" rx="2.5" ry="3" fill="rgba(247, 184, 1, 0.9)" />
              <ellipse cx="15" cy="32" rx="1" ry="1.5" fill="rgba(255, 255, 255, 0.8)" />
              
              {/* Taillights */}
              <ellipse cx="82" cy="29" rx="1.5" ry="2" fill="rgba(220, 53, 69, 0.8)" />
              <ellipse cx="82" cy="35" rx="1.5" ry="2" fill="rgba(220, 53, 69, 0.8)" />
              
              {/* Body accent line */}
              <rect x="18" y="33" width="60" height="1" fill="currentColor" opacity="0.3" />
              
              {/* Grille details */}
              <rect x="12" y="30" width="3" height="1" fill="currentColor" opacity="0.6" />
              <rect x="12" y="32" width="3" height="1" fill="currentColor" opacity="0.6" />
              <rect x="12" y="34" width="3" height="1" fill="currentColor" opacity="0.6" />
            </svg>
            
            {/* Exhaust waves */}
            <div className="wave-container">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`wave-bar ${isPlaying ? 'animating' : ''}`}
                  style={{ 
                    animationDelay: `${i * 0.15 + Math.random() * 0.1}s`,
                    height: `${Math.random() * 25 + 15}px`,
                    animationDuration: `${1.2 + Math.random() * 0.6}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

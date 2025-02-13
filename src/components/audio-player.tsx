import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  loop?: boolean;
  onEnd?: () => void;
}

export const AudioPlayer = ({ src, loop = true, onEnd }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = src;
      audio.loop = loop;
      audio.volume = 0;
      audio.play();
      setIsPlaying(true);

      const fadeInInterval = setInterval(() => {
        if (audio.volume < 1) {
          audio.volume += 0.05;
        } else {
          clearInterval(fadeInInterval);
        }
      }, 100);

      return () => {
        clearInterval(fadeInInterval);
      };
    }
  }, [src, loop]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return <audio ref={audioRef} onEnded={onEnd} />;
};

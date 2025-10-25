import { Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/context/AudioContext";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Player = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume,
  } = useAudio();

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-player border-t border-border px-4 py-3 z-50">
      <div className="flex items-center justify-between gap-4">
        {/* Currently Playing */}
        <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
          <div className="w-14 h-14 bg-muted rounded flex-shrink-0" />
          <div className="overflow-hidden">
            <div className="text-sm font-medium truncate">
              {currentTrack?.title || "No track playing"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {currentTrack?.artist || "Unknown artist"}
            </div>
          </div>
          <button className="ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-2/4 max-w-[722px]">
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={skipToPrevious}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button 
              onClick={skipToNext}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider 
              value={[progress]} 
              max={100} 
              step={0.1}
              onValueChange={handleSeek}
              className="flex-1" 
            />
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-1/4 justify-end min-w-[180px]">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider 
            value={[volume]} 
            max={100} 
            onValueChange={handleVolumeChange}
            className="w-24" 
          />
        </div>
      </div>
    </footer>
  );
};

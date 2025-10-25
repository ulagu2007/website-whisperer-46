import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAudioPlayer, Track } from '@/hooks/useAudioPlayer';
import { supabase } from '@/integrations/supabase/client';

interface AudioContextType {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  togglePlay: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  playTrack: (index: number) => void;
  tracks: Track[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Track[]>([]);

  // Load songs from database
  useEffect(() => {
    loadSongs();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('songs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'songs'
        },
        () => {
          console.log('Songs changed, reloading...');
          loadSongs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSongs = async () => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading songs:', error);
      return;
    }

    const formattedTracks: Track[] = (data || []).map((song: any) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      image: song.image_url || "",
      audioUrl: song.audio_url,
    }));

    setTracks(formattedTracks);
  };

  const audioPlayer = useAudioPlayer(tracks);

  return (
    <AudioContext.Provider value={{ ...audioPlayer, tracks }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { UploadSong } from "@/components/UploadSong";
import { useAudio } from "@/context/AudioContext";
import { Play } from "lucide-react";

const Library = () => {
  const { tracks, playTrack } = useAudio();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <section className="px-8 pt-12">
          <h1 className="text-4xl font-bold mb-8">Your Library</h1>
          
          <div className="mb-8">
            <UploadSong />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">All Songs ({tracks.length})</h2>
          </div>

          {tracks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No songs yet. Upload your first song above!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(index)}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-secondary transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{track.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Player />
    </div>
  );
};

export default Library;

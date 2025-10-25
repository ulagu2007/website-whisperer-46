import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { PlaylistCard } from "@/components/PlaylistCard";
import { useAudio } from "@/context/AudioContext";
import playlist1 from "@/assets/playlist1.jpg";
import playlist2 from "@/assets/playlist2.jpg";
import playlist3 from "@/assets/playlist3.jpg";
import playlist4 from "@/assets/playlist4.jpg";
import playlist5 from "@/assets/playlist5.jpg";
import playlist6 from "@/assets/playlist6.jpg";

const playlists = [
  {
    id: 1,
    title: "Electronic Vibes",
    description: "The hottest electronic tracks to energize your day",
    image: playlist1,
  },
  {
    id: 2,
    title: "Chill Hip Hop",
    description: "Laid-back beats for studying and relaxing",
    image: playlist2,
  },
  {
    id: 3,
    title: "Rock Classics",
    description: "Legendary rock anthems that never get old",
    image: playlist3,
  },
  {
    id: 4,
    title: "Indie Dreams",
    description: "Discover the best independent artists",
    image: playlist4,
  },
  {
    id: 5,
    title: "Jazz Lounge",
    description: "Smooth jazz for sophisticated evenings",
    image: playlist5,
  },
  {
    id: 6,
    title: "Workout Mix",
    description: "High-energy tracks to fuel your fitness",
    image: playlist6,
  },
];

const Index = () => {
  const { tracks } = useAudio();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section */}
        <section 
          className="px-8 pt-12 pb-8 mb-8"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <h1 className="text-4xl font-bold mb-2">Good evening</h1>
          <p className="text-muted-foreground">
            {tracks.length > 0 
              ? `${tracks.length} song${tracks.length > 1 ? 's' : ''} in your library` 
              : "Upload songs in Library to get started"}
          </p>
        </section>

        {/* Your Songs */}
        {tracks.length > 0 && (
          <section className="px-8 pb-8">
            <h2 className="text-2xl font-bold mb-6">Your Songs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {tracks.slice(0, 6).map((track, index) => (
                <PlaylistCard
                  key={track.id}
                  title={track.title}
                  description={track.artist}
                  image={track.image || playlists[index % playlists.length].image}
                  trackIndex={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Demo Playlists */}
        <section className="px-8 pb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {playlists.map((playlist, index) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                description={playlist.description}
                image={playlist.image}
                trackIndex={tracks.length > 0 ? index % tracks.length : 0}
              />
            ))}
          </div>
        </section>
      </main>

      <Player />
    </div>
  );
};

export default Index;

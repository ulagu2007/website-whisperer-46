import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAudio } from "@/context/AudioContext";

interface PlaylistCardProps {
  title: string;
  description: string;
  image: string;
  trackIndex: number;
}

export const PlaylistCard = ({ title, description, image, trackIndex }: PlaylistCardProps) => {
  const { playTrack } = useAudio();

  return (
    <Card className="bg-card hover:bg-secondary transition-all duration-300 cursor-pointer group p-4 rounded-lg border-0">
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button 
          onClick={() => playTrack(trackIndex)}
          className="absolute bottom-2 right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105"
        >
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
      </div>
      <h3 className="font-semibold text-base mb-1 truncate">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </Card>
  );
};

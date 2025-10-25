import { useState } from "react";
import { Upload, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const UploadSong = () => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile || !title || !artist) {
      toast.error("Please fill in all fields");
      return;
    }

    setUploading(true);

    try {
      // Upload audio file to storage
      const fileExt = audioFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('songs')
        .upload(filePath, audioFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('songs')
        .getPublicUrl(filePath);

      // Insert song metadata into database
      const { error: dbError } = await supabase
        .from('songs')
        .insert({
          title,
          artist,
          audio_url: publicUrl,
        });

      if (dbError) throw dbError;

      toast.success("Song uploaded successfully!");
      
      // Reset form
      setTitle("");
      setArtist("");
      setAudioFile(null);
    } catch (error) {
      console.error('Error uploading song:', error);
      toast.error("Failed to upload song");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Upload New Song</h2>
      </div>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="title">Song Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title"
            required
          />
        </div>

        <div>
          <Label htmlFor="artist">Artist</Label>
          <Input
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
            required
          />
        </div>

        <div>
          <Label htmlFor="audio">Audio File (MP3)</Label>
          <Input
            id="audio"
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Upload Song"}
        </Button>
      </form>
    </Card>
  );
};

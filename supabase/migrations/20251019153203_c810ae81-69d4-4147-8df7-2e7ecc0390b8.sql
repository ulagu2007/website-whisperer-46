-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('songs', 'songs', true);

-- Create songs table
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  image_url TEXT,
  duration INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Create policies - allow everyone to read songs
CREATE POLICY "Songs are viewable by everyone" 
ON public.songs 
FOR SELECT 
USING (true);

-- Create policies - allow everyone to insert songs (for demo purposes)
CREATE POLICY "Anyone can upload songs" 
ON public.songs 
FOR INSERT 
WITH CHECK (true);

-- Create policies - allow everyone to update songs
CREATE POLICY "Anyone can update songs" 
ON public.songs 
FOR UPDATE 
USING (true);

-- Create policies - allow everyone to delete songs
CREATE POLICY "Anyone can delete songs" 
ON public.songs 
FOR DELETE 
USING (true);

-- Storage policies for songs bucket
CREATE POLICY "Songs are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'songs');

CREATE POLICY "Anyone can upload songs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'songs');

CREATE POLICY "Anyone can update songs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'songs');

CREATE POLICY "Anyone can delete songs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'songs');

-- Enable realtime for songs table
ALTER PUBLICATION supabase_realtime ADD TABLE public.songs;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
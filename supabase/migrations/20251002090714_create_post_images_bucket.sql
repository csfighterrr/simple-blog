-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- Create policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'post-images' AND 
  auth.role() = 'authenticated'
);

-- Create policy to allow public access to images
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'post-images');

-- Create policy to allow users to delete their own images  
CREATE POLICY "Allow users to delete own images" ON storage.objects FOR DELETE USING (
  bucket_id = 'post-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
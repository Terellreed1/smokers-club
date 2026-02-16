
-- Create wholesale inquiries table
CREATE TABLE public.wholesale_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_address TEXT NOT NULL,
  website TEXT,
  license_number TEXT NOT NULL,
  w9_url TEXT,
  state_license_url TEXT,
  sellers_permit_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wholesale_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit wholesale inquiry"
  ON public.wholesale_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for wholesale documents
INSERT INTO storage.buckets (id, name, public) VALUES ('wholesale-docs', 'wholesale-docs', false);

-- Allow anonymous uploads to wholesale-docs bucket
CREATE POLICY "Anyone can upload wholesale docs"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'wholesale-docs');

-- Allow public read of wholesale docs (for admin review)
CREATE POLICY "Wholesale docs are readable"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'wholesale-docs');

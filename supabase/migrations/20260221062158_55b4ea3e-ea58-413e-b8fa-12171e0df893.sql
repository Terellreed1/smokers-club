
CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Anyone can insert product images" ON public.product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update product images" ON public.product_images FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete product images" ON public.product_images FOR DELETE USING (true);

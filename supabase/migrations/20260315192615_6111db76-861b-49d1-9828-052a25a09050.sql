CREATE TABLE public.state_laws (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  state_name text NOT NULL UNIQUE,
  state_code text NOT NULL UNIQUE,
  can_ship boolean NOT NULL DEFAULT false,
  can_deliver boolean NOT NULL DEFAULT false,
  legal_status text NOT NULL DEFAULT 'illegal',
  notes text DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.state_laws ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active state laws"
  ON public.state_laws FOR SELECT TO public
  USING (active = true);
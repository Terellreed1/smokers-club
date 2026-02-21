
-- Referral codes table
CREATE TABLE public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  creator_name text,
  creator_email text,
  total_signups integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can read (to validate codes) and insert (to register their code)
CREATE POLICY "Anyone can read referral codes"
  ON public.referral_codes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create a referral code"
  ON public.referral_codes FOR INSERT
  WITH CHECK (true);

-- Referral signups table
CREATE TABLE public.referral_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id uuid REFERENCES public.referral_codes(id) ON DELETE CASCADE NOT NULL,
  referred_name text,
  referred_email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_signups ENABLE ROW LEVEL SECURITY;

-- Public insert (anonymous signup via popup)
CREATE POLICY "Anyone can create a referral signup"
  ON public.referral_signups FOR INSERT
  WITH CHECK (true);

-- Public read (for analytics via admin edge function)
CREATE POLICY "Anyone can read referral signups"
  ON public.referral_signups FOR SELECT
  USING (true);

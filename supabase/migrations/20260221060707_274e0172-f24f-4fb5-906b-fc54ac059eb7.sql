
CREATE OR REPLACE FUNCTION public.increment_referral_count(code_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.referral_codes
  SET total_signups = total_signups + 1
  WHERE id = code_id;
$$;

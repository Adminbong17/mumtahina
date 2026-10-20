-- ==============================================================================
-- SUPABASE KEEP-ALIVE TABLE (Anti-Pause Protection)
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/geovurfnqmkcfbdbgcdk/sql
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.keep_alive_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pinged_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'automated_cron',
  message TEXT DEFAULT 'Keep-alive ping to prevent Supabase inactivity pause'
);

-- Enable RLS
ALTER TABLE public.keep_alive_logs ENABLE ROW LEVEL SECURITY;

-- Allow read/write for service role & anon key
CREATE POLICY "Allow public insert on keep_alive_logs"
  ON public.keep_alive_logs FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Allow read on keep_alive_logs"
  ON public.keep_alive_logs FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- Optional: Function to auto-delete logs older than 30 days to save space
CREATE OR REPLACE FUNCTION clean_old_keep_alive_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM public.keep_alive_logs WHERE pinged_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

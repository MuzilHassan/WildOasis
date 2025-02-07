import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jpndrdzsjohlfanrgzmy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwbmRyZHpzam9obGZhbnJnem15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NjA2NDQsImV4cCI6MjA1MjQzNjY0NH0.Ani9d0j6w2BEb_Nz9yBGzYdag-2mBAc3_oqA5T3ZzZ4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

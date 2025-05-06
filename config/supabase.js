// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lpbsxoutnqclmvqtgaeb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnN4b3V0bnFjbG12cXRnYWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzkwNTQsImV4cCI6MjA2MjExNTA1NH0.8fzLq7Y16r31zgUBDcM0Kpr5sMpOMwlPz0juLuwNWg4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szsymnqjinvqdxbsujas.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c3ltbnFqaW52cWR4YnN1amFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwNDAxNTgsImV4cCI6MjAzNDYxNjE1OH0.4aJbm4JX2USVJrOLcfSUwd5f1B7g4_KuZvCBNdzZ5yo';

export const supabase = createClient(supabaseUrl, supabaseKey);

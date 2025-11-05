import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xkzzfoqtqnphbpvkmlsg.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrenpmb3F0cW5waGJwdmttbHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTIwNTksImV4cCI6MjA3NzU2ODA1OX0.K4_x0N_vVfjaPkVz1dKxq-YQ1nBV7yta3RC74Ja8IhQ ";
export const supabase = createClient(supabaseUrl, supabaseKey);

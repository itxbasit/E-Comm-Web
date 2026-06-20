import { createClient } from "https://esm.sh/@supabase/supabase-js@";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://pdatasnjexwekbtgavvj.supabase.co",
  "sb_publishable_n_h_Ht1OjUB8kDxgZK5cdQ_YDMgg-kc",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    },
  },
);

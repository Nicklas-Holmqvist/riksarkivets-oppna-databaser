import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fpgfodvrkxnnelitclfb.supabase.co',
  `${process.env.SUPABASE_API_KEY_TOKEN}`
);

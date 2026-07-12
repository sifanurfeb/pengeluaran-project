import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pvhwxmdfdvgrkkuunxio.supabase.co";
const supabaseKey = "sb_publishable_2OfAPeAhwV0nVbX97jeYSg_v0JtziwK";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase as s };

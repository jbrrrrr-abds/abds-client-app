import type { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit'

type ClientDesignSubmission = {
  id: number;
  company: string;
  // Add other fields from your "client-design-submissions" table
};

type ClientDesignSubmissionResponse = PostgrestMaybeSingleResponse<ClientDesignSubmission[]>;

export async function load({ parent, params, locals })  {
  const data = await parent();
  const supabase = await locals.supabase;
  const entry: ClientDesignSubmissionResponse = await supabase.from("client-design-submissions").select("*").eq('id', params.slug)

  console.log(entry);

  return {
    data, entry
  }
}
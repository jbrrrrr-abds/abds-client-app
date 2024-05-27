import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export async function load({ parent, cookies, locals })  {
  const data = await parent();
  const supabase = await locals.supabase;
  const recentSubmits = await supabase.from("client-design-submissions").select("*").order("created_at", { ascending: false }).limit(5)

  return {
    data, recentSubmits
  }
}


export const actions: Actions = {


}
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export async function load({ parent, cookies, locals })  {
  const data = await parent();
  if (!data.user || data.user.role !== 'authenticated' || !data.user.viewAccess) {
    return redirect(303, './login/unauthorized')
  }
  const supabase = await locals.supabase;
  const recentSubmits = await supabase.from("client-design-submissions").select("*").order("created_at", { ascending: false }).limit(5)
  console.log(recentSubmits);
  return {
    data, recentSubmits
  }
}


export const actions: Actions = {


}
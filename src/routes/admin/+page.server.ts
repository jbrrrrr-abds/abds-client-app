import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { modalState } from '$lib/stores/modalState'

export async function load({ parent, cookies, locals })  {
  const data = await parent();
  if (!data.user || data.user.role !== 'authenticated') {
    return redirect(303, './login/unauthorized')
  }

  return {
    data,
  }
}


export const actions: Actions = {


}
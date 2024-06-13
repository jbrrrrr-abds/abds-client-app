import { redirect } from '@sveltejs/kit'
import { createClient } from '$lib/prismicio';
import type { Actions } from './$types'
export async function load({ parent, cookies })  {
  const data = await parent();
  if (!data.user || data.user.role !== 'authenticated') {
    return redirect(303, './login/unauthorized')
  }

  const client = createClient({ fetch, cookies })
  const slug = data.prismicUser.companies.handle
  let catalogArchive;
  console.log('catalogs');
  try {
    catalogArchive = await client.getByUID("client_catalogs_page", slug)
  } catch (error){
    return redirect(303, './no-results')
  }

  return {
    data,
    catalogArchive,
  }
}


export const actions: Actions = {

}
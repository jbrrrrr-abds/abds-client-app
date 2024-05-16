import { redirect } from '@sveltejs/kit'
import { createClient } from '$lib/prismicio';
import type { Actions } from './$types'

export async function load({ parent, cookies, locals })  {
  const data = await parent();

  if (!data.user || data.user.role !== 'authenticated') {
    return redirect(303, './login/unauthorized')
  }
  const client = createClient({ fetch, cookies })
  const slug = data.prismicUser.prismicSlug;
  let designArchive;
  designArchive = await client.getByUID("client_design_archive_page", slug);

  //console.log('design page server');
  //console.log(locals);
  return {
    data,
    designArchive
  }


}

export const actions: Actions = {
  submit: async ({ request, locals }) => {
    const supabase = await locals.supabase;
    const formData = await request.formData();

    const message = 'success'

    return message;

  }
}
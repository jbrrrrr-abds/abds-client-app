import { redirect } from '@sveltejs/kit'
import { createClient } from '$lib/prismicio';

export async function load({ parent, cookies })  {
  const data = await parent();
  if (data.user.role !== 'authenticated') {
    return redirect(303, './unauthorized')
  }
  const client = createClient({ fetch, cookies })
  const slug = data.prismicUser.prismicSlug;
  let designArchive;
  designArchive = await client.getByUID("client_design_archive_page", slug);
  return {
    data,
    designArchive
  }
}
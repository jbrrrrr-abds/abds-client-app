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

  return {
    data,
    designArchive,
  }
}

export const actions: Actions = {
  submit: async ({ request, locals }) => {
    const supabase = await locals.supabase;
    let formData = await request.formData();
    const sbTable = 'client-design-submissions'

    const sbData = {
      company: formData.get('company') as string,
      sender_notes: formData.get('notes') as string,
      sender_email: formData.get('email') as string,
      designs: JSON.parse(formData.get('selectedDesigns') as string),
      account_email: formData.get('accountEmail') as string,
    }

    async function postEntry() {
      const { data, error } = await supabase.from(sbTable).upsert(sbData);
      if (error) {
        console.log('Error posting data:', error)
        return
      }
      console.log('Entry posted successfully:', data)
    }
    postEntry();
  }
}
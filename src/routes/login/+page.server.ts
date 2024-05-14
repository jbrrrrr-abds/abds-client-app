
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'


export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      return redirect(303, './unauthorized')
    } else {
      if (data.user && data.user.role === 'authenticated') {
        const prismic = await supabase.from('users').select("prismicSlug").eq("email", data.user?.email);
        if (prismic.data && prismic.data[0].prismicSlug.length === 0) {
          return redirect(303, '/unauthorized')
        }
      }
      return redirect(303, '/designs')
    }
  }
}
